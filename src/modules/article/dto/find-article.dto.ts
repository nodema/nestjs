
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, IsInt, Min, Max, IsOptional, IsIn } from "class-validator";
export class FindArticleDto {
  @ApiProperty({ description: '当前页码', example: 1, minimum: 1, default: 1 })
  @IsInt({ message: 'pagenum必须是整数' })
  @Min(1, { message: 'pagenum最小值为1' })
  @Type(() => Number)
  pagenum: number = 1;
  @ApiProperty({ description: '每页数量', example: 10, minimum: 1, maximum: 100, default: 10 })
  @IsInt({ message: 'pagesize必须是整数' })
  @Min(1, { message: 'pagesize最小值为1' })
  @Max(100, { message: 'pagesize最大值为100' })
  @Type(() => Number)
  pagesize: number = 10;
  @ApiProperty({ description: '分类ID', example: 1, required: false })
  @IsOptional()
  @IsOptional()
  @IsInt({ message: 'cate_id必须是整数' })
  @Type(() => Number)
  cate_id?: number;
  @ApiProperty({ description: '文章状态', example: '已发布', required: false, enum: ['已发布', '草稿'] })
  @IsOptional()
  @IsString({ message: 'state必须是字符串' })
  @IsIn(['已发布', '草稿'], { message: 'state必须是已发布或者草稿' })
  state?: string;
}
