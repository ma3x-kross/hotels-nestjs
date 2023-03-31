import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { HttpStatus } from '@nestjs/common/enums'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { CreateRoleDto } from 'src/roles/dto/create-role.dto'
import { ROLES_KEY } from '../decorators/auth.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest() // получение объекта реквеста
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ])

      if (!requiredRoles) {
        // если ролей нет, то доступ будет доступен всем
        return true
      }

      const authHeader = req.headers.authorization // вытаскиваем хедер
      const bearer = authHeader.split(' ')[0]
      const token = authHeader.split(' ')[1]

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException('User is not logged in')
      }

      const user = this.jwtService.verify(token) // декодируем токен
      req.user = user // помещаем юзера в реквест

      // ПРОВЕРЯЕМ ЕСТЬ ЛИ У ПОЛЬЗОВАТЕЛЯ РОЛЬ, КОТОРАЯ НАХОДИТСЯ В НЕОБХОДИМЫХ РОЛЯХ
      return user.roles.some((role: CreateRoleDto) =>
        requiredRoles.includes(role.value),
      )

      return true
    } catch (e) {
      throw new HttpException('No access', HttpStatus.FORBIDDEN)
    }
  }
}
