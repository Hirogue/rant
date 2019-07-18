import * as Nextjs from 'next';
import { RenderModule, RenderService } from 'nest-next';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ExceptionsFilter } from './common/filters';
import { AppModule } from './app.module';
import { Logger } from './libs/logger';
import { Config } from '../config';

async function bootstrap() {
  const app = Nextjs(Config.next);
  await app.prepare();

  const server = await NestFactory.create(AppModule, { logger: new Logger() });

  (server.get(RenderModule)).register(server, app);

  server.enableCors(Config.cors);
  server.useGlobalPipes(new ValidationPipe());
  server.useGlobalFilters(new ExceptionsFilter(server.get(RenderService)));
  server.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await server.listen(Config.port, Config.hostName, () => {
    Logger.log(`Server run at port ${Config.port}`);
  });
}
bootstrap();
