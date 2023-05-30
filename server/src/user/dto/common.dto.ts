import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
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

  @ApiProperty({
    example: 'string',
    description: 'user name',
  })
  name: string;

  @ApiProperty({
    example: 'string',
    description: 'user email',
  })
  email: string;
}

export class IsSuccess {
  @ApiProperty({
    example: 'boolean',
    description: 'success',
  })
  success: boolean;
}

export class IsDuplicated {
  @ApiProperty({
    example: 'boolean',
    description: 'is duplicated',
  })
  is_duplicated: boolean;
}
