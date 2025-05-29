/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async create(data: CreateTaskDto): Promise<Task> {
    try {
      const task = this.repository.create(data);
      return await this.repository.save(task);
    } catch (error: any) {
      console.error('🚫 [UsersService:create]', error);
      throw new HttpException(
        'Error to try save task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<Task[]> {
    try {
      const tasks = await this.repository.find({
        order: { dueDate: 'ASC' },
      });

      if (!tasks) {
        throw new NotFoundException('Tasks not found');
      }

      return tasks;
    } catch (error: any) {
      console.error('🚫 [UsersService:findAll]', error);
      throw new HttpException(
        'Error to try find one task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(uuid: string): Promise<Task> {
    try {
      const task = await this.repository.findOne({
        where: { uuid },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      return task;
    } catch (error: any) {
      console.error('🚫 [UsersService:findOne]', error);
      throw new HttpException(
        'Error to try find one task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(uuid: string, data: UpdateTaskDto): Promise<UpdateResult> {
    try {
      return await this.repository.update(
        {
          uuid: uuid,
        },
        data,
      );
    } catch (error: any) {
      console.error('🚫 [UsersService:update]', error);
      throw new HttpException(
        'Error to try update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(uuid: string) {
    try {
      return await this.repository.softDelete({ uuid: uuid });
    } catch (error: any) {
      console.error('🚫 [UsersService:update]', error);
      throw new HttpException(
        'Error to try update task',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
