import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RoleGuard } from 'src/auth/guard/role.guard';
import { Constants } from 'src/utils/constants';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags("Users")

export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get("/findAllForLogin")
  findAllForLogin() {
    
    console.log("findAllForLogin called");
    const result = this.userService.findAllUser();
    console.log(result);
    return result;
  } 
  @Post("/signUp")
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @ApiSecurity("JWT-auth")
  @Get()
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN))
  findAll(@Req() req) {
    console.log(req.user);
    
    return this.userService.findAll();
  }

  @ApiSecurity("JWT-auth")
  @Delete(':id')
  @UseGuards(new RoleGuard(Constants.ROLES.ADMIN))
  remove(@Param('id') id: number,@Req() req) {
    return this.userService.remove(id);
  }

   @Get(":email")
  finduserLogin(@Param('email') email: string,@Req() req) {
    return this.userService.findUserByEmail(email);
  }

}
