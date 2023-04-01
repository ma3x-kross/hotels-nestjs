import { ApiProperty } from '@nestjs/swagger'
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript'
import { TextBlockModel } from 'src/text-block/text-block.model'

interface FileCreationAttr {
  essence_table: string
  essence_id: number
}

@Table({ tableName: 'files' })
export class FileModel extends Model<FileModel, FileCreationAttr> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({
    example: '/uploads/default/5.jpg',
    description: 'url адрес файла',
  })
  @Column({ type: DataType.STRING, unique: true })
  url: string

  @ApiProperty({
    example: '5.jpg',
    description: 'Имя файла',
  })
  @Column({ type: DataType.STRING, unique: true })
  name: string

  @ApiProperty({
    example: 'text_block',
    description: 'сущность где используется',
  })
  @Column({ type: DataType.STRING })
  essence_table: string

  @ApiProperty({
    example: '1',
    description: 'id где используется',
  })
  @Column({ type: DataType.INTEGER })
  essence_id: number

  @BelongsTo(() => TextBlockModel, 'essence_id')
  textBlock: TextBlockModel
}
