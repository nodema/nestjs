import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../../http-exception/http-exception.filter';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';
@ApiTags('用户管理')
@Controller('my')
export class UserController {
  constructor(private readonly userService: UserService) { }
  //获取用户信息
  @Get('userinfo')
  @UseGuards(AuthGuard('jwt'))
  getUserInfo(@Req() req) {
    return this.userService.getUserInfo(req.user.id)

  }

  @Get()
  @ApiOperation({ summary: '获取所有用户' })
  @ApiResponse({ status: 0, description: '成功返回用户列表' })

  //@Roles('admin')
  //@UseGuards(AuthGuard('jwt'), RolesGuard,)
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
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }
  @Get('profile/:id')
  findIdOne(@Param('id') id: number) {
    return this.userService.findIdOne(id);
  }





  @Patch(':id')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiResponse({ status: 200, description: '用户信息更新成功' })
  @ApiResponse({ status: 404, description: '用户未找到' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiBody({ type: UpdateUserDto })


  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '用户删除成功' })
  @ApiResponse({ status: 404, description: '用户未找到' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })


  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }



}
