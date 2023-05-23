import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/common.dto';

@Injectable()
export class UserService {
  async createUser(userDTO: UserDTO) {
    console.log(userDTO.id);
  }

  async login(id: string, pw: string) {
    console.log(id);
    console.log(pw);
  }
}
