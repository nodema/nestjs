import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
@Controller('auth')
@ApiTags('用户注册登陆权限相关')


export class AuthController {
  constructor(private readonly authService: AuthService) {
  }
  @ApiOperation({ summary: '用户注册' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 0, description: '请求成功' })
  @Post('register')
  async register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: '用户登录' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 200, description: '用户已登录', type: Object })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto: CreateUserDto, @Req() req) {
    console.log(req.user)
    return this.authService.login(req.user);
  }


}
