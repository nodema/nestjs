import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../user/entities/article.entity';
import { FindArticleDto } from './dto/find-article.dto';
import { skip } from 'node:test';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>

  ) { }
  async create(createArticleDto: CreateArticleDto, filename) {
    createArticleDto.cover_img = '/uploads/' + filename;
    const { id, ...articleData } = createArticleDto
    console.log(articleData);
    return await this.articleRepository.save(articleData);
  }

  async getList(query: FindArticleDto) {
    const { cate_id, pagenum, pagesize, state } = query;
    //cate_id是外键直接传承会类型不匹配，故赋值给any类型的whereClause
    const whereClause: any = {};
    if (cate_id !== undefined) {
      whereClause.cate_id = { id: cate_id };
    }

    if (state !== undefined) {
      whereClause.state = state;
    }
    const [articles, total] = await this.articleRepository.findAndCount(
      {
        skip: (pagenum - 1) * pagesize,
        order: { pub_date: 'DESC' },
        take: pagesize,
        where: whereClause,
        relations: ['cate_id'],
        select: [
          'id',
          'title',
          'pub_date',
          'state'
        ]
      },

    );
    // 处理返回结果，添加 cate_name 字段
    const articlesWithCateName = articles.map(article => ({
      ...article,
      cate_name: article.cate_id?.cate_name,
    }));
    return {
      data: articlesWithCateName,
      total,
    }; //返回列表和总数
    // return articlesWithCateName;
  }

  async findOne(id: number) {
    const originalData = await this.articleRepository.findOne({
      where: { id },
      relations: ['cate_id', 'author_id'],
    });
    if (!originalData) {
      throw new NotFoundException(`文章ID: ${id} 不存在`);

    }
    function formatData(data) {
      const author = data.author_id || {}
      return {
        data: {
          "id": data.id,
          "title": data.title,
          "content": data.content,
          "cover_img": data.cover_img,
          "pub_date": new Date(data.pub_date).toLocaleString('zh-CN', { timeZone: 'UTC' }),
          "state": data.state,
          "cate_id": data.cate_id?.id,
          "author_id": author.id || null,
          "cate_name": data.cate_id?.cate_name,
          "username": author.username || "",
          "nickname": author.nickname || ""
        }
      }
    }
    return formatData(originalData)
  }

  async update(data, file) {
    const { id, author_id, ...updateData } = data;
    // 处理 author_id 为空字符串的情况
    if (author_id === '') {
      updateData.author_id = null;
    } else if (author_id !== null && author_id !== undefined) {
      const author = await this.userRepository.findOneBy({ id: author_id });
      if (!author) {
        throw new BadRequestException(`用户ID: ${author_id} 不存在`);
      }
      updateData.author_id = author_id;
    }
    if (file) {
      updateData.cover_img = '/uploads/' + file;
    }
    delete updateData.cate_name;
    delete updateData.username;
    delete updateData.nickname;
    return this.articleRepository.update(id, updateData);
  }

  async remove(id: number) {
    return await this.articleRepository.delete({ id });
  }
}
