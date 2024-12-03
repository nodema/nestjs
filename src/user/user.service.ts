import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }
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
    await this.userRepository.save(newUser);
    //entity里过滤掉了password属性，但仅get方法不反回，save依然返回，故使用findOne避免password泄露
    return await this.userRepository.findOne({
      where: { username }
    })

  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    //return this.userRepository.findOneBy({ id });//findOneBy({ id })查询方法;
    return this.userRepository.findOne({
      where: { id: id }
    })//where({ id })查询方法

  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete({ id });
  }
}
