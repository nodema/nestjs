import exp from "constants";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { CategoryEntity } from "./category.entity";
import { TagEntity } from "./tag.entity";
import { User } from "./user.entity";




@Entity({ name: 'vben_article' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 50 })
  title: string;
  //文章描述自动生成
  @Column({ type: 'text', default: null })
  description: string;
  //文章内容
  @Column({ type: 'mediumtext', default: null })
  content: string;
  //文章内容html，自动生成
  @Column({ type: 'mediumtext', default: null })
  contentHtml: string;
  //封面图
  @Column({ default: null, name: 'cover_url' })
  coverUrl: string;
  //阅读量
  @Column({ type: 'int', default: 0 })
  views: number;
  //点赞量
  @Column({ type: 'int', default: 0 })
  likes: number;
  //文章状态
  @Column('simple-enum', { enum: ['draft', 'published'], default: 'draft' })
  status: string;
  //是否推荐
  @Column({ type: 'tinyint', default: 0 })
  isRecommend: number;
  //分类
  @ManyToOne(() => CategoryEntity, category => category.articles)
  category: CategoryEntity;
  //标签
  @ManyToMany(() => TagEntity, tag => tag.articles)
  @JoinTable({
    name: 'article_tag',
    joinColumn: { name: 'article_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  tags: TagEntity[];
  //作者
  @ManyToOne(() => User, user => user.articles)
  author: User;
  @CreateDateColumn()
  createTime: Date;
  @UpdateDateColumn()
  updateTime: Date;
}
