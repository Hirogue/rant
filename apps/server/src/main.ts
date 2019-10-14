import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@rant/config';
import { LoggerService } from '@rant/logger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    const logger = app.get(LoggerService);

    app.useLogger(logger);

    await app.listen(config.get('app.port'), () => {
        logger.log(config.get('app'))
        logger.log(config.get('search'))
        logger.log(`Server is running in ${config.get('app.env')} mode on port ${config.get('app.port')} 🚀`);
    });
}
bootstrap();
