import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { SignInDto } from '../dto/sign-in.dto';
import { validateOrReject } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const signInDto = plainToInstance(SignInDto, request.body);

    try {
      await validateOrReject(signInDto);
    } catch (errors) {
      throw new BadRequestException(
        'Missing required fields( email or password )',
      );
    }

    return super.canActivate(context) as boolean;
  }
}
