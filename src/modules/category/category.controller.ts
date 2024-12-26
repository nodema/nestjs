import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('my/cate')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  //添加分类
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);

  }
  //获取分类列表
  @Get('list')
  findAll() {

    return this.categoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }
  //更新文章分类
  @Put('info')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto);
  }
  //删除分类 Query传参
  @Delete('del')
  remove(@Query('id') id: number) {
    return this.categoryService.remove(+id);
  }
  //删除分类 Param传参
  @Delete('del/:id')
  removeOne(@Param('id') id: number) {
    return this.categoryService.remove(+id);
  }
}
