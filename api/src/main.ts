import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { useContainer } from 'class-validator'
import { configKeys } from './config/configuration'
import { validationPipe } from './config/validation'
import { AppModule } from './modules/app'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // setup container for validator constraints
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // configure app
  app.enableCors({
    origin: '*',
  })
  app.useGlobalPipes(validationPipe)

  const config = app.get(ConfigService)
  await app.listen(config.get<number>(configKeys.port))
}
bootstrap()
