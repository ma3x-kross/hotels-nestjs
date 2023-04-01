import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString } from 'class-validator'

export class CreateTextBlocKDto {
  @ApiProperty({ example: 'Title', description: 'Название текстового блока' })
  @IsString()
  readonly title: string

  @ApiProperty({
    example: 'main-text-hero',
    description: 'уникальное название для поиска',
  })
  @IsString()
  readonly slug: string

  @ApiProperty({ example: 'Text', description: 'Текст' })
  @IsString()
  readonly text: string

  @ApiProperty({ example: 'main-page', description: 'Группа' })
  @IsOptional()
  @IsString()
  readonly group: string
}
