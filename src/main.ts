import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorLoggingFilter } from './common/exceptions/error-filter-middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    errorHttpStatusCode: 422,
  }));

  app.useGlobalFilters(new ErrorLoggingFilter());

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
}

bootstrap();
