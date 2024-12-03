import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    database: 'vbendev',
    //entities: [User],//加载指定实体
    autoLoadEntities: true,//自动加载实体文件
    synchronize: true,
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
