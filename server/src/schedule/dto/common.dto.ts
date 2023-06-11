// core
import { ApiProperty } from '@nestjs/swagger';

export class SubjectDTO {
  @ApiProperty({
    example: 'string',
    description: 'user name',
  })
  name: string;

  // 0 월 ~ 6 일
  @ApiProperty({
    example: 'number',
    description: 'day',
  })
  day: number;

  @ApiProperty({
    example: '0900-1100',
    description: 'time',
  })
  time: string;

  @ApiProperty({
    example: 'string',
    description: 'description',
  })
  description: string;
}