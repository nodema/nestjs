import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
@ApiTags('分类管理')
@ApiBearerAuth('jwt')
@UseGuards(AuthGuard('jwt'))

@Controller('my/cate')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }
  //添加分类
  @ApiOperation({ summary: '添加分类' })
  @ApiBody({ type: CreateCategoryDto, description: '分类创建信息' })
  @Post('add')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);

  }
  //获取分类列表
  @ApiOperation({ summary: '获取分类列表' })
  @Get('list')
  findAll() {

    return this.categoryService.findAll();
  }


  //更新文章分类
  @ApiOperation({ summary: '更新分类' })
  @ApiBody({ type: UpdateCategoryDto, description: '分类更新信息' })
  @Put('info')
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto);
  }
  //删除分类 Query传参
  @ApiOperation({ summary: '删除分类 ' })
  @ApiQuery({ name: 'id', required: true, description: '分类ID' })
  @Delete('del')
  remove(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }

}
