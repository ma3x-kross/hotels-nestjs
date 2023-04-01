import { Module, forwardRef } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from 'src/users/models/users.model'
import { RolesController } from './roles.controller'
import { Role } from './roles.model'
import { RolesService } from './roles.service'
import { UserRoles } from './user-roles.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([Role, UserModel, UserRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [RolesService],
})
export class RolesModule {}
