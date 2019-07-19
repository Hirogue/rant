import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Todo } from '../../database/entities';
import { EditTodoInput, NewTodoInput, TodoArgs } from '../dtos';
import { TodoService } from '../services';
import { TodoPaginated } from '../types';

@Resolver(of => Todo)
export class TodoResolver {
    constructor(private readonly todoService: TodoService) { }

    @Query(returns => Todo)
    async todo(@Args('id') id: string) {
        const todo = await this.todoService.findOneById(id);
        if (!todo) {
            throw new NotFoundException(id);
        }
        return todo;
    }

    @Query(returns => TodoPaginated)
    async todos(@Args() todoArgs: TodoArgs) {
        return await this.todoService.query(todoArgs);
    }

    @Mutation(returns => Todo)
    async addTodo(
        @Args('newTodoData') newTodoData: NewTodoInput,
    ) {
        const todo = await this.todoService.create(newTodoData);
        return todo;
    }

    @Mutation(returns => Todo)
    async editTodo(
        @Args('editTodoData') editTodoData: EditTodoInput,
    ) {
        const todo = await this.todoService.update(editTodoData);
        return todo;
    }

    @Mutation(returns => Boolean)
    async removeTodo(@Args('id') id: string) {
        return this.todoService.remove(id);
    }
}