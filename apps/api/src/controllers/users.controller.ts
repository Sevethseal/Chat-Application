import {
  Controller,
  Patch,
  Body,
  UseGuards,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '../auth/authGard';
import { UsersService } from '../services/users.service';
import { ClaimReferrerDto, UpdateReferralCodeDto } from '../types/users';
import { GetUser } from '../auth/get-user.decorator';
import { CreateUserDto } from '../types/users';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user/create')
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createOrGetUser(dto);
  }
  /**
   * PATCH /users/me/referral-code
   * Body: { referralCode }
   * Updates the current user's referral code in the database.
   */
  @Patch('me/referral-code')
  updateMyReferralCode(
    @GetUser('id') supabaseId: string,
    @Body() dto: UpdateReferralCodeDto,
  ) {
    console.log(supabaseId, dto, 'dto');
    return this.usersService.updateReferralCode(supabaseId, dto);
  }
  @Get('user')
  async getMyProfile(@GetUser('id') supabaseId: string) {
    console.log(supabaseId);
    return this.usersService.getMyUser(supabaseId);
  }
  @Patch('me/referrer')
  async claimReferrer(
    @GetUser('id') supabaseId: string,
    @Body() dto: ClaimReferrerDto,
  ) {
    return this.usersService.claimReferrer(supabaseId, dto);
  }
  @Get('referrals')
  async getReferralsByCode(@Query('code') code: string) {
    return this.usersService.getUsersByReferrerCode(code);
  }
}
