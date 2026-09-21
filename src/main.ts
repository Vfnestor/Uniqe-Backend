import {
  ValidationPipe,
} from "@nestjs/common";

import {
  NestFactory,
} from "@nestjs/core";

import {
  AppModule,
} from "./app.module";

import {
  API_PREFIX,
} from "./common/constants";

import {
  HttpExceptionFilter,
} from "./common/filters";

import {
  ResponseInterceptor,
} from "./common/interceptors";

async function bootstrap() {
  const app =
    await NestFactory.create(
      AppModule,
    );

  app.setGlobalPrefix(
    API_PREFIX,
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port =
    Number(
      process.env.PORT ||
        4000,
    );

  await app.listen(port);

  console.log(
    `Uniqe Backend is running on port ${port}`,
  );
}

bootstrap();