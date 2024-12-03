import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) { }

  createToken(user: any) {

    return this.jwtService.sign(user);
  }
  async login(user: any) {
    console.log('=====================token-user' + JSON.stringify(user));
    const token = this.createToken({
      id: user.id,
      username: user.username,
      role: user.role
    })
    return { token };
  }
  async getUserInfo(user) {
    const info = await this.userRepository.findOne({
      where: { username: user.username }
    })
    return info
  }

}
