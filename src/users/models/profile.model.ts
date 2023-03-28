import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { UserModel } from './users.model'

interface ProfileCreationAttr {
  user_id: number
  full_name: string
  phone: string
}

@Table({ tableName: 'profiles' })
export class Profile extends Model<Profile, ProfileCreationAttr> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @Column({ type: DataType.STRING, allowNull: false })
  full_name: string

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  user_id: number

  @BelongsTo(() => UserModel)
  user: UserModel
}
