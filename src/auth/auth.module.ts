import { AuthController } from './auth.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './startegy/local.startegy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './startegy/jst.startegy';

@Module({
  imports: [PassportModule,UserModule,JwtModule.registerAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:(ConfigService:ConfigService)=>({
      secret:ConfigService.get('JWT_SECRET'),
      signOptions:{expiresIn:ConfigService.get<string>('JWT_EXPIRE')+"s"} //"60s"
    })
    
  })],
  controllers: [AuthController],
  providers: [LocalStrategy,JwtStrategy],
})
export class AuthModule {}
