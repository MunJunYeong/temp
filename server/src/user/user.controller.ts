import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginDTO } from './dto/controller.dto';
import { UserDTO } from './dto/common.dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('v1/users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign up
  @ApiOperation({ summary: 'sign-in' })
  @ApiOkResponse({
    description: 'success',
    type: 'bool',
  })
  @Post('/signup')
  async createUser(@Body() userDTO: UserDTO) {
    return await this.userService.createUser(userDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign in
  @ApiOperation({ summary: 'sign-in' })
  @ApiOkResponse({
    description: 'success',
    type: 'bool',
  })
  @Post('/signin')
  async login(@Body() loginDTO: LoginDTO) {
    return await this.userService.login(loginDTO.id, loginDTO.pw);
  }
}