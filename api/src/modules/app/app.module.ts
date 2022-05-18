import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { configuration, validationSchema } from 'src/config/configuration'
import { EmployeesModule } from '../employees'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchema,
      load: [configuration],
    }),
    EmployeesModule,
  ],
})
export class AppModule {}
