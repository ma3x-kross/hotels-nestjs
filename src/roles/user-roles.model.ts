import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { UserModel } from 'src/users/models/users.model'
import { Role } from './roles.model'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER })
  roleId: number

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number
}
