import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module'
import { FileModule } from 'src/files/files.module'
import { TextBlockController } from './text-block.controller'
import { TextBlockModel } from './text-block.model'
import { TextBlockService } from './text-block.service'
import { FileModel } from 'src/files/files.model'

@Module({
  controllers: [TextBlockController],
  providers: [TextBlockService],
  imports: [
    SequelizeModule.forFeature([TextBlockModel, FileModel]),
    FileModule,
    AuthModule,
  ],
})
export class TextBlockModule {}
