import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "../../user/entities/article.entity";




@Entity({ name: 'big_category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  cate_name: string;
  @OneToMany(() => ArticleEntity, articleEntity => articleEntity.category)
  articles: ArticleEntity[];
  @Column()
  cate_alias: string;

}
