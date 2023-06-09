import { ApiProperty } from '@nestjs/swagger';
import { IntegerType } from 'typeorm';

export class UserDTO {
  @ApiProperty({
    example: 'IntegerType',
    description: 'Lecture ID',
  })
  id: IntegerType;

  @ApiProperty({
    example: 'string',
    description: 'Day',
  })
  day: string;

  @ApiProperty({
    example: 'string',
    description: 'lecture name',
  })
  name: string;

  @ApiProperty({
    example: 'integer',
    description: 'start time',
  })
  start: string;

  @ApiProperty({
    example: 'integer',
    description: 'end time',
  })
  end: string;
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
