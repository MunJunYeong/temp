import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { User } from './entity/user.entity';
import { JwtModule } from 'src/lib/jwt/jwt.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports : [UserService, UserRepository]
})
export class UserModule {}
