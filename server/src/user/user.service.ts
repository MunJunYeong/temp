import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/common.dto';
import { UserRepository } from './user.repo';
import { User } from './entity/user.entity';

// lib
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated id
  async isDuplicatedID(id: string): Promise<boolean> {
    try {
      const res = await this.userRepo.findBy({
        id,
      });
      if (res.length > 0) {
        console.log(res.length);

        return true;
      }
    } catch (err) {
      console.log(err);
    }
    return false;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated email
  async isDuplicatedEmail(email: string): Promise<boolean> {
    return false;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign-up
  async createUser(userDTO: UserDTO) {
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
        const isDuplicatedID = await this.isDuplicatedID(user.id);
        const isDuplicatedEmail = await this.isDuplicatedEmail(user.email);

        if (isDuplicatedID || isDuplicatedEmail) return false;
      } catch (err) {
        // TODO: 통신 오류
      }
    }

    // 3. pw 암호화
    user.pw = await bcrypt.hash(user.pw, 10);

    // 4. save user
    let res: any;
    try {
      res = await this.userRepo.createUser(user);
    } catch (err) {
      console.log(err);
    }

    if (!res) return false;
    return true;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // login
  async login(id: string, pw: string) {
    // 1. id에 맞는 user 찾아오기
    let user: User | undefined;
    try {
      user = await this.userRepo.findOneByID(id);
      if (!user) {
        return false;
      }
    } catch (err) {
      console.log(err);
    }

    // 2. pw 확인
    const validatePassword = await bcrypt.compare(pw, user.pw);
    if (!validatePassword) {
      return false;
    }

    // TODO: jwt token 발급 

    return true;
  }
}
