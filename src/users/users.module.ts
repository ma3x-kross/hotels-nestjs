import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/users.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { Role } from 'src/roles/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { Profile } from './models/profile.model'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
    RolesModule,
  ],
})
export class UsersModule {}
