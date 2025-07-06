import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import {
  fifteenMinutesFromNow,
  getHashedPassword,
  thirtyDaysFromNow,
} from 'src/lib/utils';
import { comparePassword } from 'src/lib/utils';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationType } from 'src/notifications/dto/create-notification.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly notificationsService: NotificationsService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const { password, email, wallet, username } = signUpDto;
    const hashedPassword = await getHashedPassword(password);
    if (!hashedPassword) {
      throw new BadRequestException('Cannot hash the given password');
    }
    const isUserExists = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }, { wallet: wallet }],
      },
    });
    if (isUserExists) {
      throw new ConflictException(
        'The email, username or wallet is already registered.',
      );
    }
    const user = await this.prismaService.user.create({
      data: { ...signUpDto, password: hashedPassword },
    });
    if (user) {
      await this.notificationsService.create({
        userId: user.id,
        title: `Welcome to Mintara, ${user.username}!`,
        message: `Thank you for signing up. You can now start your epic battle journey.`,
        type: NotificationType.SUCCESS,
      });
    }
    if (!user) {
      throw new BadRequestException(
        'Error occurred while creating your account.Try again later.',
      );
    }
    return this.signIn(user);
  }

  async signIn(user: Omit<User, 'password'>) {
    const payload = { ...user };
    return {
      message: 'Success!',
      user: payload,
      accessToken: this.generateAccessToken(payload),
      accessTokenExpiresIn: fifteenMinutesFromNow(),
      refreshToken: this.generateRefreshToken(payload),
      refreshTokenExpiresIn: thirtyDaysFromNow(),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const isUserExists = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!isUserExists) {
      throw new BadRequestException('Invalid email.');
    }
    const isPasswordCorrect = await comparePassword(
      password,
      isUserExists.password,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid password');
    }
    if (isUserExists && isPasswordCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = isUserExists;
      return result;
    }
    return null;
  }

  generateRefreshToken(payload: Omit<User, 'password'>) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
      expiresIn: thirtyDaysFromNow(),
    });
  }
  generateAccessToken(payload: Omit<User, 'password'>) {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('ACCESS_TOKEN_SECRET'),
      expiresIn: fifteenMinutesFromNow(),
    });
  }

  async refreshAccessToken(refreshToken: string) {
    const decoded = this.jwtService.verify(refreshToken, {
      secret: this.configService.getOrThrow('REFRESH_TOKEN_SECRET'),
    });
    const user = await this.prismaService.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    const payload = { ...user };
    return {
      accessToken: this.generateAccessToken(payload),
      accessTokenExpiresIn: fifteenMinutesFromNow(),
      refreshToken: this.generateAccessToken(payload),
      refreshTokenExpiresIn: thirtyDaysFromNow(),
    };
  }

  extractRefreshToken(req: Request): string | null {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) {
      throw new UnauthorizedException('No cookies were found');
    }

    const cookies = this.parseCookies(cookieHeader);
    const refreshToken = cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token not found');
    }

    return refreshToken;
  }

  private parseCookies(cookieHeader: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    cookieHeader.split(';').forEach((cookie) => {
      const [name, ...rest] = cookie.split('=');
      const value = decodeURIComponent(rest.join('=')).trim();
      if (value !== 'undefined') {
        cookies[name.trim()] = value;
      }
    });
    return cookies;
  }
}
