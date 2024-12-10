import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn, BeforeInsert, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
@Entity('vben_user_info')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  age: number;
  @Column('simple-enum', { enum: ['男', '女'] })
  sex: '男' | '女';
  @CreateDateColumn({ name: 'create_time' })

  createTime: Date;
  @UpdateDateColumn({ name: 'update_time' })
  updateTime: Date;


  @OneToOne(() => User, user => user.userProfile, {

    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  // @JoinColumn()
  user: User


}
