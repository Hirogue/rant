import { ArgumentMetadata, PipeTransform, Injectable, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Logger } from '../../logger';
import { ApolloException } from '../exceptions';

@Injectable()
export class ValidationPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {

        const { metatype } = metadata;

        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        Logger.error('errors:', errors);

        if (errors.length > 0) {

            const error = errors.shift();
            const constraints = error.constraints

            Object.keys(constraints).forEach((key) => {
                throw new ApolloException(constraints[key], HttpStatus.BAD_REQUEST);
            });

        }

        return object;
    }

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}