import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('todo')
@ApiSecurity("JWT-auth")
@ApiTags("Todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body(ValidationPipe) createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    return this.todoService.create(createTodoDto,Number(userId) );
  }

  @Get('/findAllNotCompleted/:userId')
  findAllTodoByUserIdNotCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserNotCompleted(Number(userId));
  }
  @Get('/findAllCompleted/:userId')
  findAllTodoByUserIdCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserCompleted(Number(userId));
  }
  @Get('/findAllTodo/:userId')
  findAllTodoByUserId(@Param('userId') userId: number) {
    return this.todoService.findAllTodoByUserId(Number(userId));
  }



  @Patch(':id')
  update(@Param('id') id: string,) {
    return this.todoService.update(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id:number) {
    return this.todoService.remove(id);
  }
}
