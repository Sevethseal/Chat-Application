import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Malformed authorization header');
    }

    try {
      // Verify against the Supabase JWT secret (configured in JwtModule)
      const payload = this.jwtService.verify(token);

      // Supabase puts the user’s UUID in the `sub` claim
      const supabaseId = payload.sub;
      if (!supabaseId) {
        throw new UnauthorizedException('Invalid token payload');
      }

      // Attach only the supabaseId as `id` so @GetUser('id') returns it
      (req as any).user = { id: supabaseId };

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
