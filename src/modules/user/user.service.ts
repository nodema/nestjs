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
    private readonly userProfileRepository: Repository<UserProfile>
  ) { }
  //创建用户
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto
    const existUser = await this.userRepository.findOne({
      where: { username }
    })
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }
    // return this.userRepository.save(createUserDto);//createUserDto是实体对象的话可以直接save
    const newUser = await this.userRepository.create(createUserDto)//创建实体对象，确保save方法使用的是实体对象
    console.log('New User Created:', newUser);

    //entity里过滤掉了password属性，但仅get方法不反回，save依然返回，故使用findOne避免password泄露
    const userProfile = new UserProfile();
    userProfile.age = 18
    userProfile.sex = '男'
    userProfile.user = newUser
    console.log('User Profile to Save:', userProfile);
    //await this.userProfileRepository.save(userProfile)//设置了cascade: true关联关系，保存一次可关联保存

    // 更新 newUser 的 userProfile 字段
    newUser.userProfile = userProfile;
    await this.userRepository.save(newUser);
    console.log('Updated User with Profile:', newUser);




    // 使用 find 方法进行测试 查询创建的用户及其关联的 userProfile
    // const createdUser = (await this.userRepository.find({
    //   where: { username },
    //   relations: ['userProfile']
    // }))[0];

    const createdUser = await this.userRepository.findOne({
      where: { username },
      relations: ['userProfile']
    })
    console.log('Created User with Profile:', createdUser);
    return createdUser

  }

  findAll() {
    return this.userRepository.find({
      order: { createTime: 'DESC' },//find({})查询方法-参数降序排列;
      relations: ['userProfile']//查询关联表
    });
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({ id });//findOneBy({ id })查询方法;
    return this.userRepository.findOne({
      where: { id },
      relations: ['userProfile']
    })//where({ id })查询方法

  }
  findIdOne(id: number) {
    return this.userProfileRepository.findOne({
      where: { id },
      relations: ['user']
    })//查询userProfile的ID

  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
