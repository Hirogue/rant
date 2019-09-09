import { CrudOptions } from "@nestjsx/crud";
import { CRUD_OPTIONS_METADATA } from "../constants";

export class R {
    static get<T extends any>(
        metadataKey: any,
        target: Object,
        propertyKey: string | symbol = undefined,
    ): T {
        return propertyKey
            ? Reflect.getMetadata(metadataKey, target, propertyKey)
            : Reflect.getMetadata(metadataKey, target);
    }

    static getCrudOptions(target: any): CrudOptions {
        return R.get(CRUD_OPTIONS_METADATA, target);
    }
}