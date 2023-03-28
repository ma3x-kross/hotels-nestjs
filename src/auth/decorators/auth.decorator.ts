import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt.guard'
import { RoleGuard } from '../guards/roles.guard'

export const ROLES_KEY = 'roles'

export const Auth = (...roles: string[]) => {
  if (roles.length == 0) return applyDecorators(UseGuards(JwtAuthGuard))
  return applyDecorators(SetMetadata(ROLES_KEY, roles), UseGuards(RoleGuard))
}
