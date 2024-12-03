import { Strategy } from 'passport-local';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';

const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET', 'test123456'),
      signOptions: { expiresIn: '4h' },
    };
  },

});
@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule, jwtModule],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule { }
