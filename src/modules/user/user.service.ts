import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { UserProfile } from './entities/userprofile.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,

  ) { }
  findAll() {
    return this.userRepository.find({
      order: { createTime: 'DESC' },//find({})查询方法-参数降序排列;
      relations: ['userProfile']//查询关联表
    });

  }
  //获取用户信息
  getUserInfo(id: string) {
    return this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'nickname', 'email', 'user_pic'],

    });//findOneBy({ id })查询方法;
    // return this.userRepository.findOne({
    //   where: { id },
    //   relations: ['userProfile']
    // })//where({ id })查询方法

  }
  findIdOne(id: number) {
    return this.userProfileRepository.findOne({
      where: { id },
      relations: ['user']
    })//查询userProfile的ID

  }

  update(updateUserDto: UpdateUserDto) {
    const { id, ...data } = updateUserDto;
    return this.userRepository.update(id, data);
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
