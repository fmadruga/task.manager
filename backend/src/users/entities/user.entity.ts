import { Exclude, Expose } from 'class-transformer';
import { Task } from 'src/tasks/entities/task.entity';
import { hashingPassword, Timestamps } from 'src/utils';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('users')
export class User extends Timestamps {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ unique: true })
  slug: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Expose()
  get fullname(): string {
    return `${this.firstname} ${this.lastname}`;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await hashingPassword(this.password);
  }

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
