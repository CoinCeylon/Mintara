import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MintService {
  constructor(private prismaService: PrismaService) {}

  async getMintConfig(rewardId: string) {
    const reward = await this.prismaService.reward.findUnique({
      where: { id: rewardId },
      include: { rewardCatalog: true },
    });

    if (reward.status === 'MINTED') {
      throw new BadRequestException(
        'You have already minted this reward as a NFT',
      );
    }

    if (!reward) throw new NotFoundException('Reward not found');

    const policyId = process.env.POLICY_ID;
    const compiledScript = process.env.COMPILED_SCRIPT;

    const metadata = {
      '721': {
        [policyId]: {
          [reward.name]: {
            name: reward.name,
            image: reward.rewardCatalog.imageUrl,
            rarity: reward.rewardCatalog.rarity,
            type: reward.rewardCatalog.type,
            description: reward.rewardCatalog.description,
          },
        },
      },
    };

    return {
      policyId,
      assetName: reward.name,
      metadata,
      compiledScript,
    };
  }

  async updateRewardStatusToMinted(rewardId: string) {
    const isRewardExists = await this.prismaService.reward.findFirst({
      where: {
        id: rewardId,
      },
    });

    if (!isRewardExists) {
      throw new BadRequestException('No such reward exists');
    }

    await this.prismaService.reward.update({
      where: { id: rewardId },
      data: { status: 'MINTED' },
    });

    return { message: 'Reward status updated to MINTED' };
  }

  async getMintedRewards(userId: string) {
    return await this.prismaService.reward.findMany({
      where: {
        userId: userId,
        status: 'MINTED',
      },
    });
  }
}
