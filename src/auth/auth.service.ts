import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { compare, genSalt, hash } from 'bcryptjs'
import { RolesService } from 'src/roles/roles.service'
import { UserModel } from 'src/users/models/users.model'
import { AuthDto } from './dto/auth.dto'
import { GenerateTokensDto } from './dto/generate.tokens.dto'
import { RefreshTokenDto } from './dto/refreshToken.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto)
    const updatedUser = this.returnUserFields(user)
    const tokens = await this.generateTokens(updatedUser)

    return {
      user: updatedUser,
      ...tokens,
    }
  }

  async getNewToken({ refreshToken }: RefreshTokenDto) {
    if (!refreshToken) throw new UnauthorizedException('Please sign in')

    const result = await this.jwtService.verifyAsync(refreshToken) // проверяем наш токен или нет
    if (!result) throw new UnauthorizedException('Invalid token or expired!')

    const user = await this.userModel.findByPk(result.id, {
      include: ['roles'],
    })

    const updatedUser = this.returnUserFields(user)
    const tokens = await this.generateTokens(updatedUser)

    return {
      user: updatedUser,
      ...tokens,
    }
  }

  private async validateUser(dto: AuthDto): Promise<UserModel> {
    const user = await this.userModel.findOne({
      where: { email: dto.email },
      include: ['roles'],
    })
    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const isValidPassword = await compare(dto.password, user.password) // сравнение пришедшего пароля и пароля в бд
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password')
    }

    return user
  }

  async createUser(dto: AuthDto) {
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
    return user
  }

  async generateTokens(dto: GenerateTokensDto) {
    const payload = { email: dto.email, id: dto.id, roles: dto.roles }

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15d',
    })

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1h',
    })

    return { refreshToken, accessToken }
  }

  returnUserFields(user: UserModel) {
    const roles = user.roles.map((role) => ({
      value: role.value,
      description: role.description,
    }))
    return {
      id: user.id,
      email: user.email,
      roles,
    }
  }
}
