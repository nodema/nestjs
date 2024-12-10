import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户注册登陆相关')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post('register')
  async register(@Body() dto) {
    return this.authService.createToken(dto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto, @Req() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }

  @Get('userInfo')
  @UseGuards(AuthGuard('jwt'))
  async getUserInfo(@Req() req) {
    return this.authService.getUserInfo(req.user)
  }
}
