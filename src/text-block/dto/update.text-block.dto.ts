import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class UpdateTextBlocKDto {
  @ApiProperty({ example: 'Title', description: 'Название текстового блока' })
  @IsOptional()
  @IsString()
  readonly title: string

  @ApiProperty({
    example: 'main-text-hero',
    description: 'уникальное название для поиска',
  })
  @IsOptional()
  @IsString()
  readonly slug: string

  @ApiProperty({ example: 'Text', description: 'Текст' })
  @IsOptional()
  @IsString()
  readonly text: string

  @ApiProperty({ example: 'main-page', description: 'Группа' })
  @IsOptional()
  @IsString()
  readonly group: string
}
