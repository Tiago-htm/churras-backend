import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCookieAuth } from '@nestjs/swagger';
import type { Response } from 'express';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create')
  @ApiOperation({ summary: 'Cria um novo usuário' })
  create(@Body() dto: CreateAuthDto) {
    return this.authService.create(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  async login(@Body() dto: LoginAuthDto, @Res({ passthrough: true }) res: Response) {
    const resposta = await this.authService.login(dto.email, dto.password);

    res.cookie('token', resposta.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,

    });
    return { success: true };

  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { success: true };
  }

}