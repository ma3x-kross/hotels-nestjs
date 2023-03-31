import { IsOptional, IsString } from 'class-validator'

export class UpdateTextBlocKDto {
  @IsOptional()
  @IsString()
  readonly title: string

  @IsOptional()
  @IsString()
  readonly slug: string

  @IsOptional()
  @IsString()
  readonly text: string

  @IsOptional()
  @IsString()
  readonly group: string
}
