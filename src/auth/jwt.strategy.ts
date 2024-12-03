import { Injectable, UnauthorizedException, Get } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
//jwt strategy 验证Token 解析payload获得载荷数据
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET', 'test123456'), // 确保在环境变量中设置了 JWT_SECRET
    });
  }

  async validate(payload: User): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'role'], // 只选择需要的字段
    });

    if (!user) {
      throw new UnauthorizedException('Token 无效');
    }

    return user;
  }
}
