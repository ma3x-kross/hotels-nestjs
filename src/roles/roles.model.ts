import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript'
import { UserModel } from 'src/users/models/users.model'
import { UserRoles } from './user-roles.model'
import { ApiProperty } from '@nestjs/swagger'

interface RoleCreationAttr {
  value: string
  description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
  @ApiProperty({ example: 1, type: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number

  @ApiProperty({ example: 'ADMIN', type: 'Название роли' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string

  @ApiProperty({ example: 'Администратор', type: 'Описание роли' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string

  @BelongsToMany(() => UserModel, () => UserRoles)
  users: UserModel[]
}
