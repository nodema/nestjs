import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }
  //用户注册

  async register(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }
    // return this.userRepository.save(createUserDto);//createUserDto是实体对象的话可以直接save
    const newUser = await this.userRepository.create(createUserDto)//创建实体对象，确保save方法使用的是实体对象
    await this.userRepository.save(newUser);

    const createdUser = await this.userRepository.findOne({
      where: { username }
    })

    return createdUser

  }
  //用户登陆
  createToken(user: any) {

    return this.jwtService.sign(user);
  }
  async login(user: any) {

    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role
    })
    //返回对象以便对应前端
    return { token: 'Bearer ' + token };
  }

}
