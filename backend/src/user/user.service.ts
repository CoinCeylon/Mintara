import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUserById(id: string) {
    const isUserExists = await this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!isUserExists) {
      throw new BadRequestException('User with the provided id does not exist');
    }
    return isUserExists;
  }

  async updateUserById(id: string, updatedUserContent: Partial<User>) {
    const isUserExists = await this.getUserById(id);
    if (!isUserExists) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.prismaService.user.update({
      where: {
        id: isUserExists.id,
      },
      data: updatedUserContent,
    });

    if (!updatedUser) {
      throw new InternalServerErrorException(
        'Error occurred during updating user',
      );
    }
    return updatedUser;
  }

  async deleteUserById(userId: string) {
    if (!userId) {
      throw new NotFoundException('Cannot find user Id');
    }

    return await this.prismaService.user.delete({
      where: {
        id: userId,
      },
    });
  }

  async getAllUsers() {
    return this.prismaService.user.findMany();
  }
}
