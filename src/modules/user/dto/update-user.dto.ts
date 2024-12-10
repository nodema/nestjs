import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from "@nestjs/swagger";
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  username: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  avatar: string;
  @ApiProperty()
  role: string
}
