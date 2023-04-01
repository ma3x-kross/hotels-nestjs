import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { AuthDto } from 'src/auth/dto/auth.dto'

export class CreateProfileDto extends AuthDto {
  @ApiProperty({ example: 'Иванов Иван', description: 'Полное имя' })
  @IsString()
  readonly full_name: string

  @ApiProperty({ example: '89089089089', description: 'Телефон' })
  @IsString()
  readonly phone: string
}
