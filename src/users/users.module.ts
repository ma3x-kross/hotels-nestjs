import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './models/users.model'
import { UserRoles } from 'src/roles/user-roles.model'
import { Role } from 'src/roles/roles.model'
import { Profile } from './models/profile.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [
    SequelizeModule.forFeature([User, Role, UserRoles, Profile]),
    AuthModule,
  ],
})
export class UsersModule {}
