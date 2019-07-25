import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('JSON')
export class JsonScalar implements CustomScalar<string, any> {
    description = 'JSON custom scalar type';

    parseValue(value: string): any {
        return JSON.parse(value);
    }

    serialize(value: any): string {
        return JSON.stringify(value);
    }

    parseLiteral(ast: ValueNode): any {
        if (ast.kind === Kind.STRING) {
            return JSON.parse(ast.value);
        }
        return null;
    }
}