import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "../../user/entities/article.entity";




@Entity({ name: 'big_category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  cate_name: string;
  @OneToMany(() => ArticleEntity, articleEntity => articleEntity.cate_id)
  articles: ArticleEntity[];
  @Column()
  cate_alias: string;

}
