import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './authGard';

@Module({
  imports: [
    JwtModule.register({
      secret:
        'GikQx0pCSC5DmYSi8vZel3yaJvsVca35SE3b6bgFfXi9FO33TUawr/GnZsBJyWppqP2k6E4X832dSeLa7ph9eQ==',
      verifyOptions: { algorithms: ['HS256'] },
    }),
  ],
  providers: [AuthGuard],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
