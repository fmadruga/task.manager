import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: CreateTaskDto): Promise<Task> {
    return this.service.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    return this.service.findOne(uuid);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':uuid')
  async update(@Param('uuid') uuid: string, @Body() data: UpdateTaskDto) {
    return this.service.update(uuid, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.service.remove(uuid);
  }
}
