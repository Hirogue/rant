import {
  QueryFields,
  QueryFilter,
  QueryJoin,
  QuerySort,
  QueryOperation,
} from '../types';

export interface ParsedRequestParams {
  fields: QueryFields;
  paramsFilter: QueryOperation[];
  filter: QueryFilter[];
  or: QueryFilter[];
  join: QueryJoin[];
  sort: QuerySort[];
  limit: number;
  offset: number;
  page: number;
  cache: number;
}
