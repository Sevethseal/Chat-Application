import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import these once you’ve created them (we’ll sketch them below)
import { PrismaModule } from './prisma.module';
import { UsersModule } from './src/services/users.module';
import { AuthModule } from './src/auth/auth.module';

@Module({
  imports: [
    // Loads .env into process.env
    ConfigModule.forRoot({ isGlobal: true }),

    // Your Prisma wrapper
    PrismaModule,

    // Feature modules
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
