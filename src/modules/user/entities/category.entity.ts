import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "./article.entity";




@Entity({ name: 'vben_category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @OneToMany(() => ArticleEntity, articleEntity => articleEntity.category)
  articles: ArticleEntity[];

}
