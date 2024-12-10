import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/modules/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';
// 本地策略
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    });
  }

  async validate(username: string, password: string): Promise<any> {

    if (!username || !password) {
      throw new UnauthorizedException('用户名和密码不能为空');
    }

    const user = await this.UserRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role']
    });

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (!compareSync(password, user.password)) {

      throw new UnauthorizedException('账户密码不正确');
    }
    // 删除密码字段，避免返回给客户端
    delete user.password;
    console.log('=====================strategy-user' + JSON.stringify(user));
    return user;


  }
}
