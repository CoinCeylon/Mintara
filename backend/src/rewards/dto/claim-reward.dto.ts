import { IsDefined, IsNotEmpty } from 'class-validator';

export class ClaimRewardDto {
  @IsDefined()
  @IsNotEmpty()
  readonly userId: string;
}
