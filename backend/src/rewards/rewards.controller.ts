import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { ClaimRewardDto } from './dto/claim-reward.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}
  @Get('get-info-single')
  async getRewardCatalogById(@Query('catalog-id') id: string) {
    return await this.rewardsService.getRewardCatalogById(id);
  }

  @Public()
  @Get('get-info-all')
  async getAllRewardCatalogs() {
    return await this.rewardsService.getAllRewardCatalogs();
  }

  @Get('get-info-available')
  async getAvailableRewardCatalogs() {
    return await this.rewardsService.getOnlyAvailableRewardCatalogs();
  }

  @Get('get-info-claimed')
  async getClaimedRewardCatalogs() {
    return await this.rewardsService.getClaimedRewardCatalogs();
  }

  @Public()
  @Post('claim-random-reward')
  async claimReward(@Body() claimRewardDto: ClaimRewardDto) {
    return await this.rewardsService.createReward(claimRewardDto.userId);
  }

  @Public()
  @Get('get-available-rewards-for-user')
  async getRewardsByUserId(@Query('userId') userId: string) {
    return await this.rewardsService.getRewardByUserId(userId);
  }
}
