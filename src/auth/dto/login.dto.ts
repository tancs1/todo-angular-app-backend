import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsString()
  email: string; 
  
  @ApiProperty()
  @IsString()
  password: string;

}