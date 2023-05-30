import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IsDuplicated, IsSuccess, UserDTO } from './dto/common.dto';
import { UserRepository } from './user.repo';
import { User } from './entity/user.entity';

// lib
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated id
  async IsDuplicatedID(id: string): Promise<IsDuplicated> {
    let result: IsDuplicated = { is_duplicated: false };
    try {
      const res = await this.userRepo.findBy({
        id,
      });
      // ID exist
      if (res.length > 0) {
        console.info('is duplicated ID');
        result.is_duplicated = true;
        return result;
      }
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to check user ID',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated email
  async IsDuplicatedEmail(email: string): Promise<IsDuplicated> {
    let result: IsDuplicated = { is_duplicated: false };
    try {
      const res = await this.userRepo.findBy({
        email,
      });
      // Email exist
      if (res.length > 0) {
        console.info('is duplicated Email');
        result.is_duplicated = true;
        return result;
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
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign-up
  async CreateUser(userDTO: UserDTO): Promise<IsSuccess> {
    let result: IsSuccess = { success: false };
    // 1. create User entity
    const user: User = {
      // user_idx의 경우 auto increment라서 임의의 값 지정해줌
      user_idx: 1,
      id: userDTO.id,
      pw: userDTO.pw,
      name: userDTO.name,
      email: userDTO.email,
    };

    // 2. check duplicated
    {
      try {
        if (await this.IsDuplicatedID(user.id)) return result;
        if (await this.IsDuplicatedEmail(user.email)) return result;
      } catch (err) {
        // IsDuplicatedID, IsDuplicatedEmail 함수에서 error를 wrap 해주고 있음.
        throw err;
      }
    }

    // 3. pw encryption
    user.pw = await bcrypt.hash(user.pw, 10);

    // 4. save user
    try {
      const res = await this.userRepo.createUser(user);
      if (!res) return result;
    } catch (err) {
      throw new HttpException(
        {
          message: 'Failed to create user',
          error: err.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    result.success = true;
    return result;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // login
  async Login(id: string, pw: string): Promise<IsSuccess> {
    let result: IsSuccess = { success: false };
    // 1. id에 맞는 user 찾아오기
    let user: User | undefined;
    try {
      user = await this.userRepo.findOneByID(id);
      if (!user) {
        return result;
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

    // 2. pw 확인
    const validatePassword = await bcrypt.compare(pw, user.pw);
    if (!validatePassword) {
      return result;
    }

    // TODO: jwt token 발급

    result.success = true;
    return result;
  }
}
