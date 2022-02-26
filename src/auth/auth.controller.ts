import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/models/UserSchema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('login')
  async login(@Body() body) {
    const { phoneNumber, password } = body;
    const user = await this.authService.login(phoneNumber, password);
    const token = await this.authService.createToken(body);

    return {
      data: {
        user: user,
        token: token,
      },
    };
  }

  @Post('register')
  async register(@Body() body: User) {
    const user = await this.authService.register(body);
    const token = await this.authService.createToken(body);
    return {
      data: {
        user: user,
        token: token,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async getMe(@Body() body) {
    const { phoneNumber, password } = body;
    const user = await this.authService.login(phoneNumber, password);
    const token = await this.authService.createToken(body);

    return {
      data: {
        user: user,
        token: token,
      },
    };
  }
}
