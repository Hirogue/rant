import * as Nextjs from 'next';
import { RenderModule } from 'nest-next';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

const dev = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = Nextjs({ dev });
  await app.prepare();

  const server = await NestFactory.create(AppModule);

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  server.enableCors();
  server.useGlobalPipes(new ValidationPipe());

  await server.listen(8000);
}
bootstrap();
