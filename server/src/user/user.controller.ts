import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginInputDTO } from './dto/controller.dto';
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
  // check duplicated id
  @ApiOperation({ summary: 'check duplicated id' })
  @ApiOkResponse({
    description: 'is duplicated',
    type: 'bool',
  })
  @Get()
  async isDuplicatedID(@Param() id: string): Promise<boolean>{
    return await this.userService.isDuplicatedID(id);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check duplicated email
  @ApiOperation({ summary: 'check duplicated email' })
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
  async login(@Body() loginDTO: LoginInputDTO): Promise<boolean> {
    return await this.userService.login(loginDTO.id, loginDTO.pw);
  }
}
