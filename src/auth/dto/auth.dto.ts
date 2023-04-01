import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @ApiProperty({ example: 'email@gmail.ru', description: 'Почта' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: 'qwerty12', description: 'Пароль' })
  @MinLength(4, { message: 'Password cannot be less than 4 characters' })
  @IsString()
  readonly password: string
}
