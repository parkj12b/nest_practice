import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Authmodule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { DatabaseOptions } from './datasource/datasource.option';
import { PhotoModule } from './photo/photo.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    Authmodule,
    BookmarkModule,
    PhotoModule,
    UsersModule,
    TypeOrmModule.forRoot(DatabaseOptions),
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_PIPE,
      useValue: new ZodValidationPipe(),
    },
  ],
})
export class AppModule {
  constructor(private readonly datasource: DataSource) {}
}
