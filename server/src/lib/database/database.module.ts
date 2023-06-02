// core
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// lib
import { User } from 'src/user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfgService: ConfigService) => ({
        type: 'postgres',
        host: cfgService.get('DB_HOST'),
        port: cfgService.get('DB_PORT'),
        username: cfgService.get('DB_USER'),
        password: cfgService.get('DB_PW'),
        database: cfgService.get('DB_NAME'),
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule {}
