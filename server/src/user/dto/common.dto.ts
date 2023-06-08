// core
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

export class WeatherDTO {
  @ApiProperty({
    example: 'string',
    description: '맑음 정도',
  })
  sky: string;

  @ApiProperty({
    example: 'string',
    description: '최저 기온',
  })
  lowest_temp: string;

  @ApiProperty({
    example: 'string',
    description: '최고 기온',
  })
  highest_temp: string;

  @ApiProperty({
    example: 'string',
    description: '최대 강수 확률',
  })
  max_prob_rain: string;
}