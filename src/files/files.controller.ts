import {
  Controller,
  Delete,
  HttpCode,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { FileService } from './files.service'

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  @HttpCode(200)
  @Auth('ADMIN')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder?: string,
    @Query('essence_table') essence_table?: string,
    @Query('essence_id') essence_id?: number,
  ) {
    return this.fileService.saveFiles([file], folder, essence_table, essence_id)
  }

  @Delete()
  @Auth('ADMIN')
  async delete() {
    return this.fileService.deleteUnnecessaryFiles()
  }
}
