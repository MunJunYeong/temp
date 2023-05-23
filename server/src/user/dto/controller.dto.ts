import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
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
