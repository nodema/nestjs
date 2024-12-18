import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { BookModule } from './modules/book/book.module';
import { User } from './modules/user/entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({


        type: 'mysql',
        host: configService.get('DB_HOST') as string,
        port: configService.get('DB_PORT') as number,
        username: configService.get('DB_USER') as string,
        password: configService.get('DB_PASS') as string,
        database: configService.get('DB_NAME') as string,
        // host: 'localhost',
        // port: 3306,
        // username: 'root',
        // password: '123456',
        // database: 'vbendev',
        autoLoadEntities: true,//自动加载实体文件
        synchronize: true,


      }),


    }),
    UserModule,
    AuthModule,
    BookModule

  ],

  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
