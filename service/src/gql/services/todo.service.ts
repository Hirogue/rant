import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Todo } from '../../database/entities';
import { NewTodoInput, EditTodoInput } from '../dtos';
import { TodoPaginated } from '../types';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) { }

    async query(payload: any) {
        const qb = this.todoRepository.createQueryBuilder('t');

        if (!payload.page || payload.page < 1) {
            payload.page = 1;
        }

        if (!payload.pageSize) {
            payload.pageSize = 5;
        }

        if (!!payload.keyword) {
            qb.andWhere(`t.title LIKE '%${payload.keyword}%'`);
        }

        payload.order = payload.order || 'DESC';

        if (!!payload.sort) {
            qb.addOrderBy(`t.${payload.sort}`, payload.order);
        } else {
            qb.addOrderBy('t.update_at', payload.order);
        }

        qb.skip((payload.page - 1) * payload.pageSize);
        qb.take(payload.pageSize);

        const [items, total] = await qb.getManyAndCount();
        const page = payload.page;
        const totalPage = Math.ceil(total / payload.pageSize);
        const hasMore = totalPage > page;

        return plainToClass(
            TodoPaginated,
            { items, total, page, totalPage, hasMore }
        );
    }

    async create(data: NewTodoInput) {
        return await this.todoRepository.save(plainToClass(Todo, data));
    }

    async update(data: EditTodoInput) {
        return await this.todoRepository.save(plainToClass(Todo, data));
    }

    async findOneById(id: string) {
        return await this.todoRepository.findOne(id);
    }

    async remove(ids: string | string[]) {
        await this.todoRepository.delete(ids);
        return true;
    }
}