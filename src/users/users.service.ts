import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { AuthService } from 'src/auth/auth.service'
import { CreateProfileDto } from './dto/register.user.dto'
import { Profile } from './models/profile.model'
import { User } from './models/users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Profile) private readonly profileModel: typeof Profile,
    private authService: AuthService,
  ) {}

  async getAllUsers() {
    const users = await this.userModel.findAll({ include: { all: true } })
    return users
  }

  async register(dto: CreateProfileDto) {
    const user = await this.authService.createUser({
      email: dto.email,
      password: dto.password,
    })
    const profile = await this.profileModel.create({
      full_name: dto.full_name,
      phone: dto.phone,
      user_id: user.user.id,
    })

    return {
      ...user,
      ...this.returnProfileFields(profile),
    }
  }

  returnProfileFields(profile: Profile) {
    return {
      full_name: profile.full_name,
      phone: profile.phone,
    }
  }
}
