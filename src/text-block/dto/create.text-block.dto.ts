import { IsOptional, IsString } from 'class-validator'

export class CreateTextBlocKDto {
  @IsString()
  readonly title: string

  @IsString()
  readonly slug: string

  @IsString()
  readonly text: string

  @IsOptional()
  @IsString()
  readonly group: string
}
