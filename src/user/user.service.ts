import { Injectable } from '@nestjs/common';
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
  create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);

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
