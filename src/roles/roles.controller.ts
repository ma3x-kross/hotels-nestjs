import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { CreateRoleDto } from './dto/create-role.dto'
import { RolesService } from './roles.service'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Role } from './roles.model'
import { Auth } from 'src/auth/decorators/auth.decorator'

@ApiTags('Роли пользователей')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @HttpCode(200)
  @Auth('ADMIN')
  @Post()
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.createRole(dto)
  }

  @ApiOperation({ summary: 'Создание роли' })
  @ApiResponse({ status: 200, type: Role })
  @Auth('ADMIN')
  @Get('/:value')
  getByValue(@Param('value') value: string) {
    return this.roleService.getRoleByValue(value)
  }
}
