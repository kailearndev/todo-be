import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './dto/todo.entities';
import { Repository } from 'typeorm';
import { CreateTodoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) { }

    async getTodoList(): Promise<Todo[]> {
        const todo = await this.todoRepository.count()
        if (todo === 0) {
            throw new BadRequestException('Create Todo', { cause: new Error(), description: 'Dont have todo !!' })
        }
        return await this.todoRepository.find({ order: { order: 'asc' } })

    }
    async createTodoList(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = this.todoRepository.create(createTodoDto);
        return await this.todoRepository.save(todo);
    }
    async findOne(id: number): Promise<Todo> {
        const todo = await this.todoRepository.findOneBy({ id });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }
        return todo;
    }
    async updateOrder(updatedColumns: { id: number; order: number }[]): Promise<Todo[]> {
        // Sử dụng Promise.all để thực hiện cập nhật thứ tự song song
        await Promise.all(
            updatedColumns.map(column =>
                this.todoRepository.update(column.id, { order: column.order })
            ),
        );
        // Trả về danh sách các Todo đã sắp xếp theo thứ tự
        return this.todoRepository.find({ order: { order: 'ASC' } });
    }
    async updateTodo(id: number, dto: CreateTodoDto): Promise<Todo> {
        const cardUpdate = await this.findOne(id)
        const newCard = { ...cardUpdate, ...dto }
        return cardUpdate ? await this.todoRepository.save(newCard) : null
    }
    async deleteTodo(id: number[]): Promise<Todo[]> {
        const todos = await this.todoRepository.findByIds(id);  // Tìm tất cả các Todo theo danh sách id

        if (!todos.length) {
            throw new NotFoundException('No Todos found for the given IDs');
        }

        // Xóa tất cả các Todo có trong danh sách ids
        await this.todoRepository.delete(id);

        // Trả về danh sách các Todo đã bị xóa
        return todos;

    }
}
