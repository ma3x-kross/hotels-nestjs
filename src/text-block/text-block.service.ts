import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { FileService } from 'src/files/files.service'
import { CreateTextBlocKDto } from './dto/create.text-block.dto'
import { TextBlockModel } from './text-block.model'
import { FileModel } from 'src/files/files.model'
import { UpdateTextBlocKDto } from './dto/update.text-block.dto'

@Injectable()
export class TextBlockService {
  constructor(
    @InjectModel(TextBlockModel)
    private readonly textBlockModel: typeof TextBlockModel,
    @InjectModel(FileModel) private readonly fileModel: typeof FileModel,
    private readonly fileService: FileService,
  ) {}

  async createTextBlock(
    dto: CreateTextBlocKDto,
    files?: Express.Multer.File[],
    folder?: string,
  ) {
    const textBlock = await this.textBlockModel.create(dto)
    const uploadFiles = await this.fileService.saveFiles(
      files,
      folder,
      'text_block',
      textBlock.id,
    )

    uploadFiles.forEach((uploadFile) => {
      textBlock.$set('files', uploadFile.id)
    })

    return await this.textBlockModel.findByPk(textBlock.id, {
      include: { all: true },
    })
  }

  async updateTextBlock(
    id: number,
    dto: UpdateTextBlocKDto,
    files?: Express.Multer.File[],
    folder?: string,
  ) {
    const textBlock = await this.textBlockModel.findByPk(id, {
      include: { all: true },
    })
    if (!textBlock) throw new NotFoundException('Text block not found')

    if (files[0]) {
      console.log(files)
      const oldFiles = await this.fileModel.findAll({
        where: { essence_table: 'text_block', essence_id: textBlock.id },
      })
      await Promise.all(
        oldFiles.map(async (file) => this.fileService.delete(file)),
      )

      const newFiles = await this.fileService.saveFiles(
        files,
        folder,
        'text_block',
        textBlock.id,
      )

      newFiles.forEach((uploadFile) => {
        textBlock.$set('files', uploadFile.id)
      })
    }

    await textBlock.update(dto)

    return await this.textBlockModel.findByPk(id, { include: { all: true } })
  }

  async deleteTextBlock(id: number) {
    const textBlock = await this.textBlockModel.findByPk(id)
    const files = await this.fileModel.findAll({
      where: { essence_table: 'text_block', essence_id: textBlock.id },
    })
    await Promise.all(files.map(async (file) => this.fileService.delete(file)))

    await textBlock.destroy()
  }

  async getAll(group?: string) {
    if (group)
      return this.textBlockModel.findAll({
        where: { group },
        include: { all: true },
      })
    return this.textBlockModel.findAll({ include: { all: true } })
  }

  async getBySlug(slug: string) {
    const textBlock = await this.textBlockModel.findOne({
      where: { slug },
      include: { all: true },
    })
    if (!textBlock) {
      throw new NotFoundException('Text block not found')
    }
    return textBlock
  }
}
