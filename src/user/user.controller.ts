import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseFilters, ForbiddenException, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  //@UseFilters(HttpExceptionFilter)//已全局注册异常过滤器
  //  @HttpCode(204)
  findAll() {
    //throw new ForbiddenException()
    // throw new HttpException('文字异常', 401)
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
