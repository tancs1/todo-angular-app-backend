import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from 'src/utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    let user: User = new User();
    user.firstName = createUserDto.firstname;
    user.lastName = createUserDto.lastname;
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    user.role = Constants.ROLES.USER;
    return this.userRepository.save(user);
  }

  findAll() {
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
