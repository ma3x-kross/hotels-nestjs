import { ApiProperty } from '@nestjs/swagger'

class Roles {
  @ApiProperty({ example: 'USER', description: 'Название роли' })
  value: string
  @ApiProperty({ example: 'Пользователь', description: 'Описание роли' })
  description: string
}

class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id: number
  @ApiProperty({ example: 'Иванов Иван', description: 'Полное имя' })
  full_name: string

  @ApiProperty({ example: '89089089089', description: 'Телефон' })
  phone: string

  @ApiProperty({ example: 'example@mail.ru', description: 'Почта' })
  email: string

  @ApiProperty({ type: [Roles] })
  roles: Roles[]
}

export class UserResponseDto {
  @ApiProperty({ type: User })
  user: User
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp',
    description: 'refresh токен',
  })
  refreshToken: string
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp',
    description: 'access токен',
  })
  accessToken: string
}
