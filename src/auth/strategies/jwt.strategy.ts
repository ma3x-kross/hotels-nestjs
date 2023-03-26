import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { InjectModel } from '@nestjs/sequelize'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from 'src/users/users.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectModel(User) private readonly userModel: typeof User,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken, // jwt из реквеста получаем с помощью авторизованного хедера бирер токена
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    })
  }

  async validate({ id }: Pick<User, 'id'>) {
    const user = await this.userModel.findByPk(id)
    return user
  }
}
