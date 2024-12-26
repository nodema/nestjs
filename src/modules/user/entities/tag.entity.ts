import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { ArticleEntity } from "./article.entity";




@Entity({ name: 'big_tag' })
export class TagEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => ArticleEntity, article => article.tags)
  articles: ArticleEntity[];

}
