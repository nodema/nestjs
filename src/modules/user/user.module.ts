import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/modules/auth/local.strategy';
import { UserProfile } from './entities/userprofile.entity';
import { ArticleEntity } from './entities/article.entity';

import { TagEntity } from './entities/tag.entity';
import { AuthModule } from '../auth/auth.module';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, ArticleEntity, TagEntity, CategoryEntity]),
    PassportModule,
    AuthModule
  ],
  controllers: [UserController],
  providers: [UserService, LocalStrategy],
  exports: [UserService, TypeOrmModule]
})
export class UserModule { }
