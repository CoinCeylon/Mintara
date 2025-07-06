import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Public()
  @Post('create')
  async createNotificationHandler(
    @Body() notificationDto: CreateNotificationDto,
  ) {
    return this.notificationsService.create(notificationDto);
  }

  @Get('get-all')
  async getNotificationsByUserIdHandler(@Query('userId') userId: string) {
    return this.notificationsService.getNotificationsByUserId(userId);
  }

  @Post('mark-read')
  async markNotificationAsReadHandler(
    @Query('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.notificationsService.markNotificationAsRead(id, userId);
  }

  @Post('mark-all-read')
  async markAllNotificationsAsReadHandler(@Query('userId') userId: string) {
    return this.notificationsService.markAllNotificationsAsRead(userId);
  }

  @Delete('delete')
  async deleteNotificationHandler(
    @Query('id') id: string,
    @Query('userId') userId: string,
  ) {
    return this.notificationsService.deleteNotification(id, userId);
  }
}
