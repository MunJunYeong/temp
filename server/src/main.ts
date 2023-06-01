import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BaseAPIDocument } from './swagger.config';
import { SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './lib/filter/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // add filter
  app.useGlobalFilters(new HttpExceptionFilter());
  //Global Middleware 설정 -> Cors 속성 활성화
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false, // dev 환경에서만, 만약 배포 가정하에 true 추천
    }),
  );

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // add swagger
  const config = new BaseAPIDocument().initializeOptions();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // run process
  await app.listen(3000);
}
bootstrap();
