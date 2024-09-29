import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/todo.dto';
import { Todo } from './dto/todo.entities';

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) { }
    @Put('update-order')
    async updateOrder(@Body() updatedColumns: { id: number; order: number }[]): Promise<Todo[]> {
        return this.todoService.updateOrder(updatedColumns);
    }
    @Put(':id')
    async updateCard(@Param(('id')) id: number, @Body() dto: CreateTodoDto) {
        return await this.todoService.updateTodo(id, dto)
    }
    @Get()
    async getListTodo() {
        return await this.todoService.getTodoList()
    }
    @Post()
    async createTodoList(@Body() createTodo: CreateTodoDto) {
        return this.todoService.createTodoList(createTodo)
    }
    @Delete()
    async deleteTodos(@Body() ids: number[]): Promise<Todo[]> {
        return this.todoService.deleteTodo(ids);
    }

}
