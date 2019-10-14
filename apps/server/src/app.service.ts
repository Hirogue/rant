import { Injectable } from '@nestjs/common';
import { SearchService } from '@rant/search';

@Injectable()
export class AppService {
    // constructor(private readonly search: SearchService) { }

    getHello(): string {
        return 'Hello World!';
    }
}
