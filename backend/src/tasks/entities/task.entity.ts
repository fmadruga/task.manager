import { Exclude } from 'class-transformer';
import { Timestamps } from 'src/utils';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

export enum TaskStatus {
  DONE = 'DONE',
  LATE = 'LATE',
  TESTING = 'TESTING',
  PENDING = 'PENDING',
  STARTED = 'STARTED',
}

@Entity('tasks')
export class Task extends Timestamps {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  dueDate: Date;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @BeforeInsert()
  generateUUID() {
    if (!this.uuid) {
      this.uuid = uuidv4();
    }
  }
}
