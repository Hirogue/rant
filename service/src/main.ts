import * as Nextjs from 'next';
import { RenderModule } from 'nest-next';
import { NestFactory, Reflector } from '@nestjs/core';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { AppModule } from './app.module';
import { Logger, Config } from '../packages';

const dev = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = Nextjs({ dev });
  await app.prepare();

  const server = await NestFactory.create(AppModule, { logger: new Logger() });

  (server.get(RenderModule)).register(server, app);

  server.enableCors(Config.cors);
  server.useGlobalPipes(new ValidationPipe());
  server.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await server.listen(Config.port, Config.hostName, () => {
    Logger.log(`Server run at port ${Config.port}`);
  });
}
bootstrap();
