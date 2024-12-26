import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, isString, IsEmail, MaxLength, MinLength, Matches } from "class-validator";
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: '用户名不能为空' })
  @MaxLength(50, { message: '用户名长度不能超过50个字符' })
  username: string;



  @ApiProperty()
  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  //@MinLength(6, { message: '密码长度至少为6个字符' })
  @Matches(/^[A-Za-z\d@$!%*?&]{6,}$/, { message: '密码长度至少为6个字符,且只能是数字和英文字符及符号' })
  password: string;


  @ApiProperty()
  @MaxLength(50, { message: '角色名称长度不能超过50个字符' })
  role?: string = '';


}
