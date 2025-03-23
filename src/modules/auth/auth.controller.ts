import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Gère la connexion de l'utilisateur.
   * @param {LoginDto} loginDto - L'objet de transfert de données de connexion contenant l'email et le mot de passe.
   * @returns {Promise<AuthEntity>} L'entité d'authentification contenant les détails de l'utilisateur et le token.
   */
  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  login(@Body() { email, password }: LoginDto): Promise<AuthEntity> {
    return this.authService.login(email, password);
  }
}
