import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @ApiProperty({ example: 'email@gmail.ru', description: 'Почта' })
  @IsEmail()
  readonly email: string

  @ApiProperty({ example: 'qwerty12', description: 'Пароль' })
  @IsString()
  @MinLength(4, { message: 'Password cannot be less than 4 characters' })
  @IsOptional()
  readonly password: string

  @ApiProperty({ example: 'Иванов Иван', description: 'Полное имя' })
  @IsString()
  @IsOptional()
  readonly full_name: string

  @ApiProperty({ example: '89089089089', description: 'Телефон' })
  @IsOptional()
  @IsString()
  readonly phone: string
}
