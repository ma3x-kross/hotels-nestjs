import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './models/users.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { Role } from 'src/roles/roles.model'
import { RolesModule } from 'src/roles/roles.module'
import { Profile } from './models/profile.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([UserModel, Role, UserRoles, Profile]),
    RolesModule,
    AuthModule,
  ],
})
export class UsersModule {}
