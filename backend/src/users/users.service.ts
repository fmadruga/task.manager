/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import slugify from 'slugify';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    try {
      const user = new User(data);
      user.slug = await this.generateUniqueSlug(user.fullname);

      return await this.repository.save(user);
    } catch (error: any) {
      if (error.code === '23505') {
        throw new HttpException(
          'E-mail or slug already exists',
          HttpStatus.CONFLICT,
        );
      }

      console.error('🚫 [UsersService:create]', error);
      throw new HttpException(
        'Error to try save user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async generateUniqueSlug(fullname: string): Promise<string> {
    const baseSlug = slugify(fullname, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (await this.repository.findOne({ where: { slug } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    return slug;
  }
}
