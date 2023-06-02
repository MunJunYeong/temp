// core
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// lib
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';
import { DatabaseModule } from './lib/database/database.module';
import { CustomMiddleware } from './lib/middleware/middleware.service';
import { JwtModule } from './lib/jwt/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // dev, prod 환경으로 나누고자 한다면 환경에 맞는 env 추가 후 설정 해야함.
      envFilePath: '.env',
    }),
    UserModule,
    WeatherModule,
    DatabaseModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMiddleware).forRoutes({
      path: 'v1/users/middleware',
      method: RequestMethod.GET,
    });
  }
}
