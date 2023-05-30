import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginInputDTO } from './dto/controller.dto';
import { IsDuplicated, IsSuccess, UserDTO } from './dto/common.dto';
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
    type: IsDuplicated,
  })
  @Get('/check-duplicate/id')
  async isDuplicatedID(@Query('id') id: string): Promise<IsDuplicated> {
    return await this.userService.IsDuplicatedID(id);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check duplicated email
  @ApiOperation({ summary: 'check duplicated email' })
  @ApiOkResponse({
    description: 'is duplicated',
    type: IsDuplicated,
  })
  @Get('/check-duplicate/email')
  async isDuplicatedEmail(@Query('id') email: string): Promise<IsDuplicated> {
    return await this.userService.IsDuplicatedEmail(email);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign up
  @ApiOperation({ summary: 'sign up' })
  @ApiOkResponse({
    description: 'success',
    type: IsSuccess,
  })
  @Post('/signup')
  async createUser(@Body() userDTO: UserDTO): Promise<IsSuccess> {
    return await this.userService.CreateUser(userDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign in
  @ApiOperation({ summary: 'sign-in' })
  @ApiOkResponse({
    description: 'success',
    type: IsSuccess,
  })
  @Post('/signin')
  async login(@Body() loginDTO: LoginInputDTO): Promise<IsSuccess> {
    return await this.userService.Login(loginDTO.id, loginDTO.pw);
  }
}
