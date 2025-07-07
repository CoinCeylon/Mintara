import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
  constructor(private mintService: MintService) {}

  @Get('get-config')
  async getMintConfig(@Query('rewardId') rewardId: string) {
    return this.mintService.getMintConfig(rewardId);
  }

  @Put('update-reward-status')
  async updateRewardStatus(@Body() body: { rewardId: string }) {
    return this.mintService.updateRewardStatusToMinted(body.rewardId);
  }

  @Get('get-minted')
  async getAllMintedRewards(@Query('userId') userId: string) {
    return this.mintService.getMintedRewards(userId);
  }
}
