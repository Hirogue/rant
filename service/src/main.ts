import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { RenderModule, RenderService } from './render';
import * as Nextjs from 'next';
import { AppModule } from './app.module';
import { Config } from './config';
import { ExceptionsFilter, ValidationPipe } from './core';
import { Logger } from './logger';
import * as config from 'config';

async function bootstrap() {
  const app = Nextjs(config.get('next'));
  await app.prepare();

  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: new Logger(),
  });

  server.get(RenderModule).register(server, app);

  const options = new DocumentBuilder()
    .setTitle(config.get('swagger.title'))
    .setDescription(config.get('swagger.description'))
    .setVersion(config.get('swagger.version'))
    .build();

  const document = SwaggerModule.createDocument(server, options);
  SwaggerModule.setup(config.get('swagger.path'), server, document);

  server.use(cookieParser());
  server.use(compression());
  server.use(helmet(config.get('helmet')));
  server.use(csurf(config.get('csrf')));

  if (!config.get('dev')) {
    server.use(rateLimit(config.get('rateLimit')));
  } else {
    server.enableCors(config.get('cors'));
  }

  for (let assets of config.get('staticAssets') as any) {
    server.useStaticAssets(assets.path, assets.options);
  }

  server.useGlobalPipes(new ValidationPipe());
  server.useGlobalFilters(new ExceptionsFilter(server.get(RenderService)));
  server.useGlobalInterceptors(new ClassSerializerInterceptor(new Reflector()));

  await server.listen(config.get('port'), config.get('host'), () => {
    Logger.log(`Server run at ${config.get('host')}${':' + config.get('port')}`);
  });
}
bootstrap();
