import { Controller } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { WeatherService } from './weather.service';

@ApiTags('weather')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // check duplicated id
}
