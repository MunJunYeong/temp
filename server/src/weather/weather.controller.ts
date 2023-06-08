import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { WeatherService } from './weather.service';
import { WeatherDTO } from 'src/user/dto/common.dto';

@ApiTags('weather')
@ApiResponse({
  status: 500,
  description: 'Internal server error',
})
@Controller('v1/weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // get weather data
  @ApiOperation({ summary: 'get seoul weather' })
  @ApiOkResponse({
    description: 'get seoul weather',
    type: WeatherDTO,
  })
  @Get('')
  async GetCurrentWeather(): Promise<WeatherDTO> {
    return await this.weatherService.GetCurrentWeather();
  }
}
