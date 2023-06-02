// core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// lib
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { User } from './entity/user.entity';
import { JwtModule } from 'src/lib/jwt/jwt.module';
import { LoggerModule } from 'src/lib/logger/logger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule,
    LoggerModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports : [UserService, UserRepository]
})
export class UserModule {}
