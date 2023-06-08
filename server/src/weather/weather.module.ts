import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { LoggerModule } from 'src/lib/logger/logger.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [LoggerModule, ConfigModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
