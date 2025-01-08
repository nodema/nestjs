import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength, MinLength, Matches, IsInt } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @ApiProperty({ description: '分类ID', example: 1, type: 'integer', required: true })

  id: string;

  @ApiProperty({ description: '分类名称', example: '电脑', maxLength: 50 })
  @IsString()
  @IsNotEmpty({ message: '分类名称不能为空' })
  @MaxLength(10, { message: '分类名称长度不能超过10个字符' })
  cate_name: string;

  @ApiProperty({
    description: '分类别名',
    example: 'computer',
    minLength: 1,
    maxLength: 15,
    pattern: '^[a-zA-Z0-9]+$'
  })
  @IsString()
  @IsNotEmpty({ message: '分类别名不能为空' })
  @MinLength(1, { message: '分类别名长度不能少于1个字符' })
  @MaxLength(15, { message: '分类别名长度不能超过15个字符' })
  @Matches(/^[a-zA-Z0-9]+$/, { message: '分类别名必须是1-15个大小写字母和数字组成的字符串' })
  cate_alias: string;
}
