import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@rant/config';
import { LoggerService } from '@rant/logger';
import { config as dotenv } from 'dotenv';
import * as path from 'path';
import { AppModule } from './app.module';

const ENV = process.env.NODE_ENV || 'development';

async function bootstrap() {
    const envPath = path.resolve(process.cwd(), 'env', !ENV ? '.env' : `.env.${ENV}`);
    dotenv({ path: envPath });

    const app = await NestFactory.create(AppModule);

    const config = app.get(ConfigService);
    const logger = app.get(LoggerService);

    app.useLogger(logger);

    await app.listen(config.get('app.port'), () => {
        logger.log(`Loading environment variables from ${envPath}`);
        logger.log(`Server is running in ${config.get('app.env')} mode on port ${config.get('app.port')} 🚀`);
    });
}
bootstrap();
