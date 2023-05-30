import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repo';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      // TODO: 만약 env 활용하려면 cfg module, jwt module 추가해주기
      secret: 'mysecret',
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [JwtModule],
})
export class UserModule {}
