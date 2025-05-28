import {
  IsDateString,
  IsEnum,
  IsInstance,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity';
import { User } from 'src/users/entities/user.entity';
import { Transform, Type } from 'class-transformer';

export class CreateTaskDto {
  @IsInstance(User)
  @Type(() => User)
  user: User;

  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  dueDate: string;

  @IsEnum(TaskStatus)
  @Transform(({ obj }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return TaskStatus[obj.status];
  })
  @IsOptional()
  status?: TaskStatus;
}
