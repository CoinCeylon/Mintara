import { Module } from '@nestjs/common';
import { MintController } from './mint.controller';
import { MintService } from './mint.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MintController],
  providers: [MintService, PrismaService],
})
export class MintModule {}
