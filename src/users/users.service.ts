import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, SearchUserDto } from './dto/user.dto';
import { log } from 'console';
import { Lending } from './entities/lending.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async searchAllUsers(limit: number, page: number) {
    const [items, count] = await this.userRepository.findAndCount();
    return items;
  }

  async search(searchUserDto: SearchUserDto): Promise<User> {
    const { id, nicknameOrEmail, page, limit } = searchUserDto;
    let items;
    log(
      `id: ${id}, nicknameOrEmail: ${nicknameOrEmail}, page: ${page}, limit: ${limit}`,
    );
    try {
      if (!nicknameOrEmail && !id) {
        // items = await this.userRepository.find({
        //   skip: page * limit,
        //   take: limit,
        // });
        items = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            'user.lendings',
            'lending',
            'lending.userId = user.id',
          )
          .getMany();
        log(`items: ${typeof(items)}`);
        items.map((user) => {

        });
        const overDueDay = items.reduce((acc, cur) => acc + cur.overDueDay, 0);
        return { ...items, overDueDay };
      }
    } catch (error: any) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
