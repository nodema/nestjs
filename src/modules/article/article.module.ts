import { BadRequestException, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { UserModule } from '../user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Module({
  imports: [UserModule,
    MulterModule.register({
      storage: diskStorage({
        destination: join(process.cwd(), 'uploads'),
        filename: (req, file, cb) => {
          const filename = `${new Date().getTime() + extname(file.originalname)}`;
          return cb(null, filename);
        },
      }),
      limits: {
        fileSize: 1024 * 1024 * 5,//限制文件大小5M
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new BadRequestException('仅允许图片文件上传!'), false);
        }
        cb(null, true);
      }
    })],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule { }
