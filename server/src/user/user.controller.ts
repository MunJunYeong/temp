import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  // is duplicated id
  @ApiOperation({ summary: 'is duplicated id' })
  @ApiOkResponse({
    description: 'is duplicated',
    type: 'bool',
  })
  @Get()
  async isDuplicatedID(@Param() id: string): Promise<boolean>{
    return await this.userService.isDuplicatedID(id);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // is duplicated email
  @ApiOperation({ summary: 'is duplicated email' })
  @ApiOkResponse({
    description: 'is duplicated',
    type: 'bool',
  })
  @Get()
  async isDuplicatedEmail(@Param() email: string): Promise<boolean>{
    return await this.userService.isDuplicatedEmail(email);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign up
  @ApiOperation({ summary: 'sign up' })
  @ApiOkResponse({
    description: 'success',
    type: 'bool',
  })
  @Post('/signup')
  async createUser(@Body() userDTO: UserDTO): Promise<boolean> {
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
  async login(@Body() loginDTO: LoginDTO): Promise<boolean> {
    return await this.userService.login(loginDTO.id, loginDTO.pw);
  }
}
