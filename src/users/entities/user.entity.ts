import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { date } from 'zod';
import { Lending } from './lending.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 100, unique: true})
  email: string;
  
  @Column({ type: 'varchar', length: 255, default: 1234 })
  password: string; // You might want to handle passwords securely

  @Column({ type: 'varchar', length: 255, nullable: true})
  nickname: string;

  @Column({ type: 'int', unique: true, nullable: true})
  intraId: number;

  @Column({ type: 'varchar', unique: true, nullable: true })
  slack: string;

  @Column({ type: 'datetime'})
  penaltyEndDate: Date
  
  @Column({ type: 'boolean', default: false })
  role: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Lending, lending => lending.user)
  lendings: Lending[];
}
