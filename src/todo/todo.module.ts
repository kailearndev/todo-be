import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './dto/todo.entities';
import { TodoController } from './todo.controller';

@Module({
  providers: [TodoService],
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  exports: [TodoService]

})
export class TodoModule { }
