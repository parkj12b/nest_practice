import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  createUserSchema,
  ResponseUserDto,
  ResponseUserSchama,
  UpdateUserDto,
} from './dto/users.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user', description: 'Create user' })
  @Post()
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: ResponseUserDto,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const result = await this.usersService.create(createUserDto);

    const safeResult = ResponseUserSchama.safeParse(result);
    return safeResult.data;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    console.log(typeof id);
    const result = await this.usersService.findOne(id);

    const safeResult = ResponseUserSchama.safeParse(result);
    return safeResult.data;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
