import { Body, Controller, Headers, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './strategies/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    const token = await this.authService.createToken(loginDto);

    return {
      data: {
        user: user,
        token: token,
      },
    };
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const { phoneNumber, password } = registerDto;
    const user = await this.authService.register(registerDto);
    const token = await this.authService.createToken({ phoneNumber, password });
    return {
      data: {
        user: user,
        token: token,
      },
    };
  }

  @Post('token')
  async getToken(@Body() loginDto: LoginDto) {
    const token = await this.authService.createToken(loginDto);
    return {
      data: {
        token,
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async getMe(@Headers('Authorization') authToken: string) {
    const { user, token } = await this.authService.getMe(authToken);

    return {
      data: {
        user,
        token,
      },
    };
  }
}
