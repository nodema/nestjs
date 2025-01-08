
import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsString, IsNotEmpty, isString, IsEmail, MaxLength, MinLength, Matches, IsEnum } from "class-validator";
export enum ArticleState {
  Draft = '草稿',
  Published = '已发布',
}

export class CreateArticleDto {
  @ApiProperty({ description: '文章标题', example: '我的第一篇文章', maxLength: 50 })
  @IsNotEmpty({ message: '标题不能为空' })
  @MaxLength(50, { message: '标题长度不能超过50个字符' })
  title: string;
  @ApiProperty({ description: '分类ID', example: 1 })
  @IsNotEmpty({ message: '分类ID不能为空' })
  cate_id: any;
  @ApiProperty({ description: '文章内容', example: '这是我的第一篇文章的内容。' })
  content: string;
  @ApiProperty({ description: '文章封面图片file格式', required: false })
  cover_img: any;
  @IsEnum(ArticleState)
  @ApiProperty({ description: '文章状态', example: '已发布', enum: ArticleState })
  state: string;
  @Exclude() // 确保 id 字段不会被包含在 DTO 中
  id?: number; // 可选，用于明确表示 id 字段的存在
}
