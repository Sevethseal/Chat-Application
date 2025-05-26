import { IsString, Length, IsEmail, IsOptional } from 'class-validator';

export class UpdateReferralCodeDto {
  @IsString()
  @Length(1, 255)
  referralCode: string;
}

export class CreateUserDto {
  @IsString()
  @Length(1, 255)
  supabaseId: string;

  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  referralCode?: string;
  @IsOptional()
  @IsString()
  referredById?: string;
}
export class ClaimReferrerDto {
  @IsString()
  @Length(1, 255)
  referralCode: string;
}
