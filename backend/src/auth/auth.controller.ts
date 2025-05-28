import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() data: SignInDto): Promise<{ access_token: string }> {
    const token = await this.authService.validateUser(
      data.email,
      data.password,
    );

    return { access_token: `Bearer ${token}` };
  }
}
