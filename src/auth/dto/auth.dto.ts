import { IsEmail, IsString, MinLength } from 'class-validator'

export class AuthDto {
  @IsEmail()
  readonly email: string
  @MinLength(4, { message: 'Password cannot be less than 4 characters' })
  @IsString()
  readonly password: string
}
