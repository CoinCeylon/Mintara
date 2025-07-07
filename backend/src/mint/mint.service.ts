import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MintService {
  constructor(private prisma: PrismaService) {}

  async getMintConfig(rewardId: string) {
    const reward = await this.prisma.reward.findUnique({
      where: { id: rewardId },
      include: { rewardCatalog: true },
    });

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
}
