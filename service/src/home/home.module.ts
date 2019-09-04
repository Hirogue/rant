import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ProjectController } from './project.controller';
import { FinanceController } from './finance.controller';
import { ProductController } from './product.controller';
import { ServiceController } from './service.controller';
import { NewsController } from './news.controller';
import { HelpController } from './help.controller';
import { AboutController } from './about.controller';
import { SearchController } from './search.controller';
import { UserController } from './user.controller';
import { HomeController } from './home.controller';

@Module({
    controllers: [
        HomeController,
        ProjectController,
        FinanceController,
        ProductController,
        ServiceController,
        NewsController,
        HelpController,
        AboutController,
        SearchController,
        UserController
    ]
})
export class HomeModule { }
