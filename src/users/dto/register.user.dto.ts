import { IsString } from 'class-validator'
import { AuthDto } from 'src/auth/dto/auth.dto'

export class CreateProfileDto extends AuthDto {
  @IsString()
  readonly full_name: string
  @IsString()
  readonly phone: string
}
