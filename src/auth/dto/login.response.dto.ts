import { ApiProperty } from '@nestjs/swagger'

class Roles {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  value: string
  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  description: string
}

class User {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  id: number
  @ApiProperty({ example: 'example@mail.ru', description: 'Почта' })
  email: string
  @ApiProperty({ type: [Roles] })
  roles: Roles[]
}

export class LoginResponseDto {
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
