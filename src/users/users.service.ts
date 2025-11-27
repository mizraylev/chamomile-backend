import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { PASSWORD_HASH_ROUNDS } from 'src/constants/enter';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async create(createUserDto: CreateUserDto) {
    await this.dataSource.transaction(async (manager) => {
      const hashedPassword = await hash(
        createUserDto.password,
        PASSWORD_HASH_ROUNDS,
      );

      const newUser: Omit<User, 'id'> = {
        nickname: createUserDto.username,
        ...createUserDto,
        hashedPassword,
      };

      await manager.save(User, newUser);
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
