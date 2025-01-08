import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsBase64, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Matches } from 'class-validator';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    type: 'string',
    description: '用户ID格式为UUID',
    example: "9cb3c040-ba45-4664-8b5f-093cb4bc1e11",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  id: string;
  @ApiProperty({
    type: 'string',
    description: '用户名',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username: string;

  @ApiProperty({
    type: 'string',
    description: '用户昵称，1-10位非空格字符',
    example: 'John',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  @Matches(/^[^\s]+$/, { message: '昵称不能包含空格' })
  nickname: string;

  @ApiProperty({
    type: 'string',
    description: '用户邮箱，必须符合邮箱格式',
    example: 'john.doe@example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    type: 'string',
    description: '用户头像地址，base64格式的图片',
    example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...",
    required: false,
  })
  @IsString()
  @IsOptional()

  user_pic: string;

}
