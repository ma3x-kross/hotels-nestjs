import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { User } from './models/users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private roleService: RolesService,
  ) {}

  async getAllUsers() {
    const users = await this.userModel.findAll({ include: { all: true } })
    return users
  }
}
