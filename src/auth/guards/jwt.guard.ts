import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() // получение объекта реквеста
    try {
      const authHeader = req.headers.authorization // вытаскиваем хедер
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User is not logged in')
      }

      const user = this.jwtService.verify(token) // декодируем токен
      req.user = user // помещаем юзера в реквест

      return true
    } catch (e) {
      throw new UnauthorizedException('User is not logged in')
    }
  }
}
