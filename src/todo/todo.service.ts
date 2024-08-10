import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    private userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    let todo: Todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.users = await this.userService.findUserByID(userId);
    return this.todoRepository.save(todo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['users'],
      where: { users: { id: userId }, completed: false },
    });
  }findAllTodoByUserCompleted(userId: number) {
    return this.todoRepository.find({
      relations: ['users'],
      where: { users: { id: userId }, completed: true },
    });
  }findAllTodoByUserId(userId: number) {
    return this.todoRepository.find({ relations: ['users'],
      where: { users: { id: userId } },});

  }

  update(id: number) {
    return this.todoRepository.update(id, { completed: true });
  }

  remove(todoId: number) {
    return this.todoRepository.delete(todoId);
  }
}
