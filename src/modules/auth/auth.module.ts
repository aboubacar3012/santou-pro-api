import { Module } from '@nestjs/common';
import { AuthService } from '@/modules/auth/auth.service';
import { AuthController } from '@/modules/auth/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@/modules/auth/jwt.strategy';
import { AccountsModule } from '@/modules/accounts/accounts.module';

export const jwtSecret =
  'b4c1b3b0-1b4b-4b7b-8b4b-4b1b3b0b4c1b-d4c1b3b0-1b4b-4b7b-8b4b-4b1b3b0b4c1b';

/**
 * AuthModule is responsible for handling authentication-related functionality.
 * It imports necessary modules and provides authentication services and controllers.
 */
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: { expiresIn: '1d' }, // 1 jour: c'est la durée de validité du token
    }),
    AccountsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
