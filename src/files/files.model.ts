import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface FileCreationAttr {
  essence_table: string
  essence_id: number
}

@Table({ tableName: 'files' })
export class FileModel extends Model<FileModel, FileCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, unique: true })
  url: string

  @Column({ type: DataType.STRING, unique: true })
  name: string

  @Column({ type: DataType.STRING })
  essence_table: string

  @Column({ type: DataType.INTEGER })
  essence_id: number
}
