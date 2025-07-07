import { Controller, Get, Query } from '@nestjs/common';
import { MintService } from './mint.service';

@Controller('mint')
export class MintController {
  constructor(private mintService: MintService) {}

  @Get('get-config')
  async getMintConfig(@Query('rewardId') rewardId: string) {
    return this.mintService.getMintConfig(rewardId);
  }
}
