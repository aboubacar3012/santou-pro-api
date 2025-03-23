import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtSecret } from '@/modules/auth/auth.module';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  /**
   * JwtStrategy constructor
   * @param {UsersService} authService - The users service
   */
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret,
    });
  }

  /**
   * Validate the JWT payload
   * @param {Object} payload - The JWT payload
   * @param {string} payload.userId - The user ID from the payload
   * @returns {Promise<any>} - The validated user
   * @throws {UnauthorizedException} - If the user is not found
   */
  async validate(payload: { userId: string }) {
    const user = await this.authService.findOne(payload.userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
