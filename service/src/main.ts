import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { RenderModule, RenderService } from 'nest-next';
import * as Nextjs from 'next';
import { Config } from './config';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './common/core';
import { Logger } from './common/logger';
import '../local';

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
