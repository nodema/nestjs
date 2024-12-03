import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  @ApiOperation({ summary: '用户登陆' })
  @UseGuards(AuthGuard('local'))
  async login(@Body() dto, @Req() req) {
    return req.user

  }

  //创建用户
  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 0, description: '用户创建成功' })
  @ApiResponse({ status: -1, description: '请求参数错误' })
  @ApiBody({ type: CreateUserDto })


  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 0, description: '成功返回用户列表' })
  //@UseFilters(HttpExceptionFilter)//已全局注册异常过滤器
  //  @HttpCode(204)

  findAll() {
    //throw new ForbiddenException()
    // throw new HttpException('文字异常', 401)
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '根据 ID 获取用户' })
  @ApiResponse({ status: 200, description: '成功返回用户信息' })
  @ApiResponse({ status: 404, description: '用户未找到' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })


  //ParesIntPipe 管道解析字符串为数字，非数字时抛出异常
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  @ApiResponse({ status: 404, description: '用户未找到' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiBody({ type: UpdateUserDto })


  update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户未找到' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })


  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }



}
