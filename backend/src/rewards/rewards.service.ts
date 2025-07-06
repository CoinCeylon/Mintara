import { BadRequestException, Injectable } from '@nestjs/common';
import { NotificationType } from 'src/notifications/dto/create-notification.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly notificationsService: NotificationsService,
  ) {}
  async getRewardCatalogById(id: string) {
    const isRewardExists = await this.prismaService.rewardCatalog.findUnique({
      where: { id: id },
    });
    if (!isRewardExists) {
      throw new BadRequestException(
        'Such reward catalog with the provided id does not exist',
      );
    }
    return isRewardExists;
  }

  async getAllRewardCatalogs() {
    return this.prismaService.rewardCatalog.findMany();
  }

  async getOnlyAvailableRewardCatalogs() {
    return this.prismaService.rewardCatalog.findMany({
      where: {
        reward: null,
      },
    });
  }

  async getClaimedRewardCatalogs() {
    return this.prismaService.rewardCatalog.findMany({
      where: {
        reward: {
          NOT: null,
        },
      },
    });
  }

  async getRewardByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    const userReward = await this.prismaService.reward.findMany({
      where: {
        userId: userId,
      },
      include: {
        rewardCatalog: true,
      },
    });

    console.log('User Reward:', userReward);

    if (!userReward) {
      throw new BadRequestException('No rewards found for the user');
    }

    return userReward;
  }

  async createReward(userId: string) {
    const availableCatalogs = await this.prismaService.rewardCatalog.findMany({
      where: {
        reward: null,
      },
    });

    if (availableCatalogs.length === 0) {
      throw new BadRequestException(
        'No available rewards. All rewards have been claimed by players.',
      );
    }

    const randomCatalog =
      availableCatalogs[Math.floor(Math.random() * availableCatalogs.length)];

    const newReward = await this.prismaService.reward.create({
      data: {
        userId,
        rewardCatalogId: randomCatalog.id,
        name: randomCatalog.name,
      },
    });

    if (newReward) {
      await this.notificationsService.create({
        userId: userId,
        title: `New Reward Received!`,
        message: `Congratulations! You have received a new ${randomCatalog.rarity} reward - ${newReward.name}`,
        type: NotificationType.SUCCESS,
      });
    }

    return await this.prismaService.reward.findFirst({
      where: {
        id: newReward.id,
      },
      include: { rewardCatalog: true },
    });
  }
}
