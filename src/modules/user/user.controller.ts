import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters, ForbiddenException, HttpException, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../../http-exception/http-exception.filter';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../auth/role.decorator';
import { RolesGuard } from '../auth/role.guard';
@UseGuards(AuthGuard('jwt'))
@ApiTags('用户管理')
@Controller('my')
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private readonly userService: UserService) { }
  //获取用户信息
  @Get('userinfo')

  getUserInfo(@Req() req) {
    return this.userService.getUserInfo(req.user.id)

  }


  @Patch('userinfo')
  @ApiOperation({ summary: '更新用户信息' })
  @ApiBody({ type: UpdateUserDto })


  update(@Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })

  @ApiParam({ name: 'id', required: true, description: '用户ID' })
  @ApiParam({ name: 'id', required: true, description: '用户ID' })


  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }



}
