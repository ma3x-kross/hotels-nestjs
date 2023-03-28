import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UpdateUserDto {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(4, { message: 'Password cannot be less than 4 characters' })
  @IsOptional()
  readonly password: string

  @IsString()
  @IsOptional()
  readonly full_name: string

  @IsOptional()
  @IsString()
  readonly phone: string
}
