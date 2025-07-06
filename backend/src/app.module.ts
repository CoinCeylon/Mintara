import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [PrismaModule, AuthModule, UserModule, RewardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
