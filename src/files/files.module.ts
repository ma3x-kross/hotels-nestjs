import { Module } from '@nestjs/common'
import { SequelizeModule } from '@nestjs/sequelize'
import { ServeStaticModule } from '@nestjs/serve-static'
import { path } from 'app-root-path'
import { AuthModule } from 'src/auth/auth.module'
import { FileController } from './files.controller'
import { FileModel } from './files.model'
import { FileService } from './files.service'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`, // ПУТЬ КУДА БУДЕМ СОХРАНЯТЬ ФАЙЛЫ
      serveRoot: '/uploads',
    }),
    AuthModule,
    SequelizeModule.forFeature([FileModel]),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
