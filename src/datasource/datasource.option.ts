import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const DatabaseOptions: TypeOrmModuleOptions = {
  type: 'mysql', // Database type
  host: 'localhost', // Database host
  port: 4242, // Database port
  username: 'root', // Database username
  password: '1234', // Database password
  database: 'nest', // Database name
  autoLoadEntities: true,
  synchronize: true, // Synchronize the schema (development only, not for production)
};
