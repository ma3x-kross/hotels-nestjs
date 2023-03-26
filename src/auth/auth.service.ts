import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { compare, genSalt, hash } from 'bcryptjs'
import { RolesService } from 'src/roles/roles.service'
import { User } from 'src/users/users.model'
import { AuthDto } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const tokens = await this.issueTokenPair(String(user.id))
    return {
      user,
      ...tokens,
    }
  }

  private async validateUser(dto): Promise<User> {
    const user = await this.userModel.findOne({ where: { email: dto.email } })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const isValidPassword = await compare(dto.password, user.password) // сравнение пришедшего пароля и пароля в бд
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }

  async register(dto: AuthDto) {
    const candidate = await this.userModel.findOne({
      where: { email: dto.email },
    })
    if (candidate) {
      throw new BadRequestException(
        'User with this email is already in the system',
      )
    }
    //генерация соли для хэширования
    const salt = await genSalt(10)

    const user = await this.userModel.create({
      email: dto.email,
      password: await hash(dto.password, salt), // хэширование пароля
    })
    const role = await this.roleService.getRoleByValue('USER')
    await user.$set('roles', [role.id])
    const tokens = await this.issueTokenPair(String(user.id))

    return {
      user,
      ...tokens,
    }
  }

  async issueTokenPair(userId: string) {
    const payload = { id: userId }

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15d',
    })

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    })

    return { refreshToken, accessToken }
  }
}
