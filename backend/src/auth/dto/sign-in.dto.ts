import { IsDefined, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsDefined()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
