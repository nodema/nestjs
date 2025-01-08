import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { UserProfile } from './userprofile.entity';
import { ArticleEntity } from "./article.entity";
@Entity('big_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    comment: '用户名',
    length: 100
  })
  username: string;
  @Column({
    default: null,
    comment: '用户昵称',
    length: 100
  })
  nickname: string;

  @Column({ select: false })
  password: string;
  @Column({
    default: null,
    comment: '用户邮箱',
    length: 100
  })
  email: string;
  @Column({
    default: null,
    comment: '用户头像',

  })
  user_pic: string;

  @Column('simple-enum', { enum: ['admin', 'author', 'user'], default: 'user' })
  role: string;

  @Column({
    default: 1,
    comment: '1-正常 0-禁用'
  })
  active: number
  @CreateDateColumn({ name: 'create_time' })

  createTime: Date;
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;

  @OneToOne(() => UserProfile, userprofile => userprofile.user, {
    cascade: true,//加上此语句如果userprofile中也@JoinColumn()会造成循环依赖 Cyclic dependency:
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  userProfile: UserProfile;
  @OneToMany(() => ArticleEntity, article => article.author_id)
  articles: ArticleEntity[];
  @BeforeInsert()
  async bcryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  };



}
