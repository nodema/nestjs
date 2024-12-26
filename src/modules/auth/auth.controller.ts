import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('auth')
@ApiTags('用户注册登陆权限相关')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @Post('register')
  async register(@Body() dto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto, @Req() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }


}
