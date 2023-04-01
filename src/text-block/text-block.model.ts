import { ApiProperty } from '@nestjs/swagger'
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript'
import { FileModel } from 'src/files/files.model'

interface TextBlockCreationsAttr {
  title: string
  text: string
}

@Table({ tableName: 'text_block' })
export class TextBlockModel extends Model<
  TextBlockModel,
  TextBlockCreationsAttr
> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'Title', description: 'Название текстового блока' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @ApiProperty({
    example: 'main-text-hero',
    description: 'уникальное название для поиска',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  slug: string

  @ApiProperty({ example: 'Text', description: 'Текст' })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string

  @ApiProperty({ example: 'main-page', description: 'Группа' })
  @Column({ type: DataType.STRING })
  group: string

  @HasMany(() => FileModel, 'essence_id')
  files: FileModel[]
}
