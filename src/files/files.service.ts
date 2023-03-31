import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { path, resolve } from 'app-root-path'
import { ensureDir, writeFile, unlink } from 'fs-extra'
import { Op } from 'sequelize'
import { FileModel } from './files.model'

@Injectable()
export class FileService {
  constructor(
    @InjectModel(FileModel) private readonly fileModel: typeof FileModel,
  ) {}

  async saveFiles(
    files: Express.Multer.File[],
    folder = 'default',
    essence_table?: string,
    essence_id?: number,
  ) {
    try {
      const uploadFolder = `${path}/uploads/${folder}`
      await ensureDir(uploadFolder) // создание директории

      const res = await Promise.all(
        files.map(async (file) => {
          await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)

          const data = {
            url: `/uploads/${folder}/${file.originalname}`,
            name: file.originalname,
            essence_table,
            essence_id,
          }
          return await this.fileModel.create(data)
        }),
      )
      return res
    } catch (e) {
      console.log(e)

      throw new HttpException(
        'File write error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      )
    }
  }

  async deleteUnnecessaryFiles() {
    const files = await this.fileModel.findAll({
      where: {
        [Op.or]: [
          { essence_table: null },
          { essence_id: null },
          {
            createdAt: {
              [Op.lt]: new Date(Date.now() - 60 * 60 * 1000),
            },
          },
        ],
      },
    })
    files.forEach(async (file) => this.delete(file))
    return files
  }

  async delete(file: FileModel) {
    const filePath = resolve(file.url)
    await unlink(filePath)
    await (await this.fileModel.findByPk(file.id)).destroy()
  }
}
