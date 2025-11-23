import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nickname: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  hashedPassword: string;

  @Column({ default: false })
  isOnline?: boolean;

  @Column('timestamptz', { nullable: true })
  lastSeen?: string;
}
