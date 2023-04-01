import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateTextBlocKDto } from './dto/create.text-block.dto'
import { TextBlockService } from './text-block.service'
import { UpdateTextBlocKDto } from './dto/update.text-block.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { TextBlockModel } from './text-block.model'

@ApiTags('Текстовый блок')
@Controller('text-block')
export class TextBlockController {
  constructor(private textBlockService: TextBlockService) {}

  @ApiOperation({ summary: 'Создание текстового блока' })
  @ApiResponse({ status: 200, type: TextBlockModel })
  @Auth('ADMIN')
  @HttpCode(200)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateTextBlocKDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.textBlockService.createTextBlock(dto, [file])
  }

  @ApiOperation({ summary: 'Обновление текстового блока' })
  @ApiResponse({ status: 200, type: TextBlockModel })
  @HttpCode(200)
  @Auth('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateTextBlocKDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.textBlockService.updateTextBlock(id, dto, [file])
  }

  @ApiOperation({ summary: 'Получение всех текстовых блоков' })
  @ApiResponse({ status: 200, type: [TextBlockModel] })
  @Auth('ADMIN')
  @Get()
  getAll(@Query('group') group: string) {
    return this.textBlockService.getAll(group)
  }

  @ApiOperation({
    summary: 'Получение текстового блока по уникальному названию для поиска',
  })
  @ApiResponse({ status: 200, type: TextBlockModel })
  @Auth('ADMIN')
  @Get('/:slug')
  getBySlug(@Param('slug') slug: string) {
    return this.textBlockService.getBySlug(slug)
  }
  @ApiOperation({
    summary: 'Удаление текстового блока',
  })
  @ApiResponse({ status: 200 })
  @Auth('ADMIN')
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.textBlockService.deleteTextBlock(id)
  }
}
