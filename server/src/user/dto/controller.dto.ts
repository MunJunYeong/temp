// core
import { ApiProperty } from '@nestjs/swagger';

export class LoginInputDTO {
  @ApiProperty({
    example: 'string',
    description: 'user ID',
  })
  id: string;

  @ApiProperty({
    example: 'string',
    description: 'user password',
  })
  pw: string;
}

export class LoginOutputDTO {
  @ApiProperty({
    example: 'string',
    description: 'jwt access token',
  })
  access_token: string;

  @ApiProperty({
    example: 'string',
    description: 'jwt refresgh token',
  })
  refresh_token: string;
}

export class EmailOnlyDTO {
  @ApiProperty({
    example: 'string',
    description: 'email',
  })
  email: string;
}

export class ResetPasswordDTO {
  @ApiProperty({
    example: 'string',
    description: 'email',
  })
  email: string;

  @ApiProperty({
    example: 'string',
    description: 'id',
  })
  id: string;

  @ApiProperty({
    example: 'string',
    description: 'password',
  })
  pw: string;
}
