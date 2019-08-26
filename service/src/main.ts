import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { RenderModule, RenderService } from 'nest-next';
import * as Nextjs from 'next';
import '../local';
import { AppModule } from './app.module';
import { Config } from './config';
import { ExceptionsFilter, ValidationPipe } from './core';
import { Logger } from './logger';

async function bootstrap() {
  const app = Nextjs(Config.next);
  await app.prepare();

  const server = await NestFactory.create<NestExpressApplication>(AppModule, { logger: new Logger() });

  (server.get(RenderModule)).register(server, app);

  const options = new DocumentBuilder()
    .setTitle('Rant')
    .setDescription('The rant API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(server, options);
  SwaggerModule.setup('docs', server, document);

  server.use(cookieParser());

  if (!Config.dev) {
    server.use(csurf(Config.csrf));
    server.use(helmet(Config.helmet));
    server.use(rateLimit(Config.rateLimit));
  } else {
    server.enableCors(Config.cors);
  }

  server.use(compression());

  for (let assets of Config.staticAssets) {
    server.useStaticAssets(assets.path, assets.options);
  }

  server.useGlobalPipes(new ValidationPipe());
  server.useGlobalFilters(new ExceptionsFilter(server.get(RenderService)));
  server.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await server.listen(Config.port, Config.hostName, () => {
    Logger.log(`Server run at port ${Config.port}`);
  });

}
bootstrap();
