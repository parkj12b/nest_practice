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
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import {
  CreateUserDto,
  createUserSchema,
  ResponseUserDto,
  ResponseUserSchama,
  SearchUserDto,
  searchUserSchema,
  UpdateUserDto,
  UserSchema,
} from './dto/user.dto';
import { log } from 'console';
import { z } from 'nestjs-zod/z';

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

  @ApiOperation({ summary: 'Search user', description: 'Search user' })
  @ApiQuery({ name: 'name', required: false, description: 'Name of the user' })
  @ApiQuery({
    name: 'nicknameOrEmail',
    required: false,
    description: 'nickname of the user or the email',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page',
    type: Number,
  })
  @Get()
  async search(@Query() searchUserDto: SearchUserDto) {
    const result = await this.usersService.search(searchUserDto);

    // log(`result: ${JSON.stringify(result)}`);
    const userListSchema = z.array(UserSchema);
    const safeResult = userListSchema.safeParse(result);

    // if(!safeResult.success) {
    //   throw new InternalServerErrorException('Internal server error');
    // }
    return safeResult;
  }

  // @Get()
  // findAll() {
  //   return this.usersService.findAll();
  // }

  // @Get(':id')
  // async findOne(@Param('id') id: number) {
  //   console.log(typeof id);
  //   const result = await this.usersService.findOne(id);

  //   const safeResult = ResponseUserSchama.safeParse(result);
  //   return safeResult.data;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.usersService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
