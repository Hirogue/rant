import { NestFactory } from '@nestjs/core';
import { ConfigService, ConfigModule } from '@rant/config';
import { LoggerService } from '@rant/logger';
import { AppModule } from './app.module';

async function bootstrap() {
    ConfigModule.initEnvironment();

    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    const logger = app.get(LoggerService);

    app.useLogger(logger);

    await app.listen(config.get('app.port'), () => {
        logger.log(`Server is running in ${config.get('app.env')} mode on port ${config.get('app.port')} 🚀`);
    });
}
bootstrap();
