import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class RoleDto {
  @ApiProperty({ example: 'ADMIN', description: 'Название роли' })
  @IsString()
  readonly value: string

  @ApiProperty({
    example: 1,
    description: 'Id пользователя, которому выдать роль',
  })
  @IsNumber()
  readonly userId: number
}
