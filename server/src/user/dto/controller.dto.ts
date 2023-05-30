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
    description: 'jwt refresh token',
  })
  refresh_token: string;
}