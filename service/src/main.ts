import * as Nextjs from 'next';
import { RenderModule } from 'nest-next';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { Logger, Config } from '../packages';

const dev = process.env.NODE_ENV !== 'production';

async function bootstrap() {
  const app = Nextjs({ dev });
  await app.prepare();

  const server = await NestFactory.create(AppModule, {
    logger: new Logger()
  });

  const renderer = server.get(RenderModule);
  renderer.register(server, app);

  server.enableCors(Config.cors);
  server.useGlobalPipes(new ValidationPipe());

  await server.listen(Config.port, Config.hostName, () => {
    Logger.log(`Server run at port ${Config.port}`);
  });
}
bootstrap();
