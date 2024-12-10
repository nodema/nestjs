import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/modules/auth/local.strategy';
import { UserProfile } from './entities/userprofile.entity';
import { ArticleEntity } from './entities/article.entity';
import { CategoryEntity } from './entities/category.entity';
import { TagEntity } from './entities/tag.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, ArticleEntity, CategoryEntity, TagEntity]),
    PassportModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
  exports: [UserService]
})
export class UserModule { }
