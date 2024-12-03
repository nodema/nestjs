import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';
@Entity('vben_user')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({
    unique: true,
    comment: '用户名',
    length: 100
  })
  username: string;
  @Column({ length: 100 })
  nickname: string;

  @Column({ select: false })
  password: string;

  @Column()
  avatar: string;
  @Column()
  email: string;
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

  @BeforeInsert()
  async bcryptPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  };


}
