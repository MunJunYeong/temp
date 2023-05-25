import { Injectable } from '@nestjs/common';
import { UserDTO } from './dto/common.dto';

@Injectable()
export class UserService {
  async createUser(userDTO: UserDTO) {
    // 1. 

    console.log(userDTO.id);

    return true;
  }
  
  async login(id: string, pw: string) {
    
    // 1.
    console.log(id);
    console.log(pw);
    return true;
  }
}
