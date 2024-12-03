import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('admin_user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column()
  role: string;
  @Column()
  nickname: string;

  @Column({
    default: 1,
    comment: '1-正常 0-禁用'
  })
  active: number
}
