import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, UploadedFile, Put, UseGuards } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { FindArticleDto } from './dto/find-article.dto';
import { log } from 'console';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiTags, ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
@UseGuards(AuthGuard('jwt'))
@Controller('/my/article')
@ApiTags('文章管理')
@ApiBearerAuth('jwt')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }
  @ApiOperation({ summary: '发布文章' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: '我的第一篇文章' },
        cate_id: { type: 'integer', example: 1 },
        content: { type: 'string', example: '这是我的第一篇文章的内容。' },
        state: { type: 'string', enum: ['草稿', '已发布'], example: '已发布' },
        cover_img: { type: 'string', format: 'binary', description: '文章封面图片' },
      },
      required: ['title', 'cate_id', 'content', 'state'],
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 0, description: '请求成功' })
  @Post('add')
  @UseInterceptors(FileInterceptor('cover_img'))
  create(@Body() createArticleDto: CreateArticleDto, @UploadedFile() file) {
    return this.articleService.create(createArticleDto, file ? file.filename : undefined);
  }
  @ApiOperation({ summary: '获取文章列表' })
  // @ApiQuery({ type: FindArticleDto, description: '查询参数' })
  @Get('list')

  getList(@Query() query: FindArticleDto
  ) {
    console.log(query);

    return this.articleService.getList(query);
  }
  @ApiOperation({ summary: '获取文章详情' })
  @ApiQuery({ name: 'id', required: true, description: '文章ID' })
  @Get('info')
  //Query传参
  findOne(@Query('id') id: string) {
    return this.articleService.findOne(+id);
  }


  @ApiOperation({ summary: '更新文章详情' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'integer', example: 1 },
        title: { type: 'string', example: '更新后的文章标题' },
        cate_id: { type: 'integer', example: 1 },
        content: { type: 'string', example: '这是更新后的内容。' },
        state: { type: 'string', enum: ['草稿', '已发布'], example: '已发布' },
        cover_img: { type: 'string', format: 'binary', description: '文章封面图片' },
      },
      required: [],
    },
  })
  @Put('info')
  @UseInterceptors(FileInterceptor('cover_img'))
  update(@Body() data, @UploadedFile() file) {
    console.log(data);
    console.log(file);
    return this.articleService.update(data, file ? file.filename : undefined);
  }



  @ApiOperation({ summary: '删除文章' })
  @ApiQuery({ name: 'id', required: true, description: '文章ID' })
  @Delete('info')
  remove(@Query('id') id: string) {
    return this.articleService.remove(+id);
  }
}
