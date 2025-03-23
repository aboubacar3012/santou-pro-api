import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './entity/auth.entity';
import { LoginDto } from './dto/login.dto';
import { CheckUserExistDto } from './dto/check-user-exist.dto';

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

  /**
   * Vérifie si un utilisateur existe dans le système.
   * @param {CheckUserExistDto} checkUserExistDto - L'objet contenant l'email à vérifier.
   * @returns {Promise<{ exists: boolean }>} Un objet indiquant si l'utilisateur existe.
   */
  @Post('check-user-exist')
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        exists: {
          type: 'boolean',
          description: "Indique si l'utilisateur existe",
        },
      },
    },
  })
  checkUserExist(
    @Body() { email }: CheckUserExistDto,
  ): Promise<{ exists: boolean }> {
    return this.authService.checkUserExist(email);
  }
}
