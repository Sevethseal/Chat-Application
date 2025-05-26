// File: apps/api/src/users/users.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ClaimReferrerDto, UpdateReferralCodeDto } from '../types/users';
import { CreateUserDto } from '../types/users';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user, or return existing if supabaseId already exists.
   */
  async createOrGetUser(dto: CreateUserDto & { referralCode?: string }) {
    try {
      // Base data for creation
      const createData: any = {
        supabaseId: dto.supabaseId,
        email: dto.email,
        referralCode: uuidv4(),
      };

      // If a referralCode was provided, attempt to link to a referrer
      if (dto.referralCode) {
        const referrer = await this.prisma.user.findUnique({
          where: { referralCode: dto.referralCode },
        });
        if (referrer) {
          createData.referredById = referrer.id;
        }
      }

      return await this.prisma.user.create({ data: createData });
    } catch (error: any) {
      // If the user already exists, return the existing record
      if (error.code === 'P2002' && error.meta.target.includes('supabaseId')) {
        return this.prisma.user.findUnique({
          where: { supabaseId: dto.supabaseId },
        });
      }
      throw error;
    }
  }

  /**
   * Get the current user's profile
   */
  async getMyUser(supabaseId: string) {
    return this.prisma.user.findUnique({
      where: { supabaseId },
      select: {
        supabaseId: true,
        email: true,
        referralCode: true,
        referredById: true,
      },
    });
  }

  /**
   * Update referral code
   */
  async updateReferralCode(supabaseId: string, dto: UpdateReferralCodeDto) {
    try {
      return await this.prisma.user.update({
        where: { supabaseId },
        data: { referralCode: dto.referralCode },
      });
    } catch (error: any) {
      if (
        error.code === 'P2002' &&
        error.meta.target.includes('referralCode')
      ) {
        throw new BadRequestException('Referral code already in use');
      }
      throw error;
    }
  }

  /**
   * Claim referrer by code
   */
  async claimReferrer(supabaseId: string, dto: ClaimReferrerDto) {
    const referrer = await this.prisma.user.findUnique({
      where: { referralCode: dto.referralCode },
    });
    if (!referrer) {
      throw new BadRequestException('Invalid referral code');
    }
    return this.prisma.user.update({
      where: { supabaseId },
      data: { referredById: referrer.id },
    });
  }

  async getUsersByReferrerCode(referralCode: string) {
    const owner = await this.prisma.user.findUnique({
      where: { referralCode },
    });
    if (!owner) {
      throw new BadRequestException('Invalid referral code');
    }
    return this.prisma.user.findMany({
      where: { referredById: owner.id },
      select: { id: true, supabaseId: true, email: true, referralCode: true },
    });
  }
}
