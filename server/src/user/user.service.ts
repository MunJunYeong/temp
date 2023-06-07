// core
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

// lib
import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/common.dto';
import { User } from './entity/user.entity';

import { UserRepository } from './user.repo';
import { LoginOutputDTO } from './dto/controller.dto';
import { JwtService } from 'src/lib/jwt/jwt.service';
import { LoggerService } from 'src/lib/logger/logger.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
    private readonly logger: LoggerService,
  ) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated id
  async IsDuplicatedID(id: string): Promise<Boolean> {
    try {
      const res = await this.userRepo.findBy({
        id,
      });
      // ID exist
      if (res.length > 0) {
        console.info('is duplicated ID');
        return true;
      }
    } catch (err) {
      this.logger.error('Failed to check user ID', 'IsDuplicatedID');
      throw new HttpException(
        {
          message: 'Failed to check user ID',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated email
  async IsDuplicatedEmail(email: string): Promise<Boolean> {
    try {
      const res = await this.userRepo.findBy({
        email,
      });
      // Email exist
      if (res.length > 0) {
        console.info('is duplicated Email');
        return true;
      }
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to check user Email',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign-up
  async CreateUser(userDTO: UserDTO): Promise<Boolean> {
    // 1. create User entity
    const user: User = {
      // user_idx의 경우 auto increment라서 임의의 값 지정해줌
      user_idx: 0,
      id: userDTO.id,
      pw: userDTO.pw,
      name: userDTO.name,
      email: userDTO.email,
    };

    // 2. check duplicated
    {
      try {
        if (await this.IsDuplicatedID(user.id)) return false;
        if (await this.IsDuplicatedEmail(user.email)) return false;
      } catch (err) {
        // already wrap error
        throw err;
      }
    }

    // 3. pw encryption
    user.pw = await bcrypt.hash(user.pw, 10);

    // 4. save user
    try {
      const res = await this.userRepo.save(user);
      if (!res) return false;
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to create user',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // login
  async Login(id: string, pw: string): Promise<LoginOutputDTO | Boolean> {
    // 1. id에 맞는 user 찾아오기
    let user: User | undefined;
    {
      try {
        user = await this.userRepo.findOneBy({
          id,
        });
        if (!user) {
          return false;
        }
      } catch (err) {
        throw new HttpException(
          {
            message: 'Failed to find user',
            error: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    // 2. pw 확인
    const validatePassword = await bcrypt.compare(pw, user.pw);
    if (!validatePassword) {
      return false;
    }

    // 3. jwt 토큰 발행
    const res: LoginOutputDTO = {
      access_token: this.jwtService.generateAccessToken({
        user_idx: user.user_idx,
        id: user.id,
        email: user.email,
      }),
      refresh_token: this.jwtService.generateRefreshToken({
        user_idx: user.user_idx,
      }),
    };
    return res;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // forgot id
  async retrieveID(email: string): Promise<boolean> {
    // 1. 해당 email의 user를 찾는다.
    let user: User;
    try {
      user = await this.userRepo.findOneBy({
        email,
      });
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to find user Email',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (!user) {
      return false;
    }

    // 2. 해당 유저의 ID를 email로 전송하는 것이 basic flow
    // TODO: 아니면 그냥 ID만 return해줘서 화면에 뿌려주기 ?
    console.info(`입력한 '${email}'의 사용자 ID : ${user.id}`);

    return true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check user
  async checkUser(id: string, email: string) {
    try {
      const res = await this.userRepo.findBy({
        id,
        email,
      });
      // 일치하는 user가 없다면
      if (res.length === 0) return false;
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to find user Email',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // reset pw
  async resetPassword(id: string, email: string, pw: string) {
    let user: User;
    // 1. id, email과 matching되는 user 찾기
    {
      try {
        user = await this.userRepo.findOneBy({
          id,
          email,
        });
      } catch (err) {
        throw new HttpException(
          {
            message: 'Failed to find user Email',
            error: err.message,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      // 일치하는 user가 없다면
      if (!user) return false;
    }

    // 2. pw 암호화
    user.pw = await bcrypt.hash(pw, 10);

    // 해당 user의 pw를 변경
    await this.userRepo.save(user);

    return true;
  }
}
