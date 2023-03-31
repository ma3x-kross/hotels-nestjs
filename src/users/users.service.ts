import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { genSalt, hash } from 'bcryptjs'
import { AuthService } from 'src/auth/auth.service'
import { RolesService } from 'src/roles/roles.service'
import { UserRoles } from 'src/roles/user-roles.model'
import { AddRoleDto } from './dto/add.role.dto'
import { CreateProfileDto } from './dto/register.user.dto'
import { UpdateUserDto } from './dto/update.user.dto'
import { Profile } from './models/profile.model'
import { UserModel } from './models/users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    @InjectModel(UserRoles) private readonly userRolesModel: typeof UserRoles,
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

  async updateUser(id: number, dto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id, { include: { all: true } })
    if (!user) throw new NotFoundException('User not found')
    const profile = await this.profileModel.findOne({
      where: { user_id: user.id },
    })
    const isSameUser = await this.userModel.findOne({
      where: { email: dto.email },
    })

    if (isSameUser && id != isSameUser.id) {
      throw new BadRequestException('Email busy')
    }

    user.email = dto.email

    if (dto.password) {
      const salt = await genSalt(10)
      user.password = await hash(dto.password, salt)
    }
    const updatedUser = await user.save()

    const updatedProfile = await profile.update({
      full_name: dto.full_name || profile.full_name,
      phone: dto.phone || profile.phone,
    })

    return {
      ...this.authService.returnUserFields(updatedUser),
      ...this.returnProfileFields(updatedProfile),
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

  async deleteUser(id: number) {
    const user = await this.userModel.findByPk(id)
    if (!user) throw new NotFoundException('User not found')
    await user.destroy()
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userModel.findByPk(dto.userId)
    const role = await this.roleService.getRoleByValue(dto.value)

    if (user && role) {
      user.$add('roles', [role.id])
      return dto
    }
    throw new NotFoundException('User or role not found')
  }

  async deleteRole(dto: AddRoleDto) {
    const role = await this.roleService.getRoleByValue(dto.value)
    const userRole = await this.userRolesModel.findOne({
      where: { userId: dto.userId, roleId: role.id },
    })

    if (userRole) {
      await userRole.destroy()
      return dto
    }
    throw new NotFoundException('Role not found')
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
