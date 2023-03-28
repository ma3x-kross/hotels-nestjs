import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthService } from 'src/auth/auth.service'
import { RolesService } from 'src/roles/roles.service'
import { AddRoleDto } from './dto/add.role.dto'
import { CreateProfileDto } from './dto/register.user.dto'
import { Profile } from './models/profile.model'
import { UserModel } from './models/users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    private authService: AuthService,
    private roleService: RolesService,
  ) {}

  async register(dto: CreateProfileDto) {
    await this.authService.createUser({
      email: dto.email,
      password: dto.password,
    })

    const user = await this.userModel.findOne({
      where: { email: dto.email },
      include: ['roles'],
    })

    const updatedUser = this.authService.returnUserFields(user)

    const tokens = await this.authService.generateTokens(updatedUser)

    const profile = await this.profileModel.create({
      full_name: dto.full_name,
      phone: dto.phone,
      user_id: updatedUser.id,
    })

    return {
      ...updatedUser,
      ...this.returnProfileFields(profile),
      ...tokens,
    }
  }

  async getAllUsers() {
    const users = await this.userModel.findAll({ include: { all: true } })
    const updatedUsers = users.map((user) =>
      this.returnUserFieldsWithProfile(user, user.profile),
    )
    return updatedUsers
  }

  async getUserById(id: number) {
    const user = await this.userModel.findByPk(id, { include: { all: true } })
    if (!user) throw new NotFoundException('User not found')
    return this.returnUserFieldsWithProfile(user, user.profile)
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)

    if (user && role) {
      user.$add('roles', [role.id])
      return dto
    }
    throw new HttpException('UserModel or role not found', HttpStatus.NOT_FOUND)
  }

  returnUserFieldsWithProfile(user: UserModel, profile: Profile) {
    const userFields = this.authService.returnUserFields(user)
    const profileFields = this.returnProfileFields(profile)
    return {
      ...userFields,
      ...profileFields,
    }
  }

  returnProfileFields(profile: Profile) {
    return {
      full_name: profile.full_name,
      phone: profile.phone,
    }
  }
}
