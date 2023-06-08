// core
import {
  Body,
  Controller,
  Get,
  Put,
  Post,
  Query,
  Req,
  Param,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

// lib
import {
  EmailOnlyDTO,
  LoginInputDTO,
  LoginOutputDTO,
  ResetPasswordDTO,
} from './dto/controller.dto';
import { UserDTO } from './dto/common.dto';
import { UserService } from './user.service';

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
    type: Boolean,
  })
  @Get('/check-duplicate/id')
  async isDuplicatedID(@Query('id') id: string): Promise<Boolean> {
    return await this.userService.IsDuplicatedID(id);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check duplicated email
  @ApiOperation({ summary: 'check duplicated email' })
  @ApiOkResponse({
    description: 'is duplicated',
    type: Boolean,
  })
  @Get('/check-duplicate/email')
  async isDuplicatedEmail(@Query('id') email: string): Promise<Boolean> {
    return await this.userService.IsDuplicatedEmail(email);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign up
  @ApiOperation({ summary: 'sign up' })
  @ApiOkResponse({
    description: 'success',
    type: Boolean,
  })
  @Post('/signup')
  async createUser(@Body() userDTO: UserDTO): Promise<Boolean> {
    return await this.userService.CreateUser(userDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // sign in
  @ApiOperation({ summary: 'sign-in' })
  @ApiOkResponse({
    description: 'success',
    type: LoginOutputDTO || Boolean,
  })
  @Post('/signin')
  async login(
    @Body() loginDTO: LoginInputDTO,
  ): Promise<LoginOutputDTO | Boolean> {
    return await this.userService.Login(loginDTO.id, loginDTO.pw);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // forgot id
  @ApiOperation({ summary: 'find id' })
  @ApiOkResponse({
    description: 'is match email, show id',
    type: Boolean,
  })
  @Post('/forgot-id')
  async findID(@Body() emailOnlyDTO: EmailOnlyDTO): Promise<Boolean> {
    return await this.userService.retrieveID(emailOnlyDTO.email);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // reset password
  @ApiOperation({ summary: 'reset password' })
  @ApiOkResponse({
    description: 'reset password',
    type: Boolean,
  })
  @Post('/reset-password')
  async resetPassword(@Body() pwDTO: ResetPasswordDTO): Promise<Boolean> {
    return await this.userService.resetPassword(
      pwDTO.id,
      pwDTO.email,
      pwDTO.pw,
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // reset password
  @ApiOperation({ summary: 'update user data' })
  @ApiOkResponse({
    description: 'update user data',
    type: Boolean,
  })
  @Put('/:user_idx')
  async updateUserData(
    @Param('user_idx') userIdx: number,
    @Body() userDTO: UserDTO,
  ): Promise<Boolean> {
    return await this.userService.UpdateUserData(userIdx, userDTO);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // test check middleware
  @Get('/middleware')
  async testMiddleware(@Req() request: Request) {
    return {
      token_user: request['user'],
    };
  }
}
