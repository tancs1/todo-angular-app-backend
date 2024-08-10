/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Users } from 'src/user/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
@ApiTags("Login")
export class AuthController {
    constructor(private jwtService:JwtService){

    }
    @Post('login')
    @UseGuards(AuthGuard("local"))
    login(@Req() req, @Body() loginDto:LoginDto ) {
        const users:Users=req.user
        console.log(users);
        
        const payload={
            userId:users.id,
            firstName:users.firstName,
            lastName:users.lastName,
            email:users.email,
            role:users.role
        }
        
        return{token:this.jwtService.sign(payload)}
    }
}
