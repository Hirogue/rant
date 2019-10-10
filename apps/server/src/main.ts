import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LOGGER_MODULE_NEST_PROVIDER } from '@rant/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = app.get(LOGGER_MODULE_NEST_PROVIDER);

  app.useLogger(logger);

  await app.listen(3000);
}
bootstrap();
