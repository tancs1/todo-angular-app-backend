import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {  Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}
  create(createUserDto: CreateUserDto) {
    let users: Users = new Users();
    users.firstName = createUserDto.firstname;
    users.lastName = createUserDto.lastname;
    users.email = createUserDto.email;
    users.password = createUserDto.password;
    users.role = Constants.ROLES.USER;
    return this.userRepository.save(users);
  }

  
  findAll() {
    return this.userRepository.find();
  } findAllUser() {
    return this.userRepository.find();
  }

  findUserByID(id:number){
return this.userRepository.findOneOrFail({where: {id: id}})
  }

  

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }
}
