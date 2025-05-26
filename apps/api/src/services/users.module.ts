import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from '../controllers/users.controller';
import { PrismaModule } from '../../prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule], // if UsersService needs auth guard or JwtService
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
