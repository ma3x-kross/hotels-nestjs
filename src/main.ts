import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function start() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe())

  const config = new DocumentBuilder()
    .setTitle(' Hotels nest.js')
    .setDescription('Документация Rest API')
    .setVersion('1.0.0')
    .addTag('Sigutin Vadim')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/docs', app, document) // 1 парам путь по которому откроется документация

  await app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
}
start()
