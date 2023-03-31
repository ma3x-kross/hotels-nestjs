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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  title: string

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  slug: string

  @Column({ type: DataType.STRING, allowNull: false })
  text: string

  @Column({ type: DataType.STRING })
  group: string

  @HasMany(() => FileModel, 'essence_id')
  files: FileModel[]
}
