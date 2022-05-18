import { Module } from '@nestjs/common'
import { EmployeeAlreadyRegisteredConstraint } from './config/validation'
import { EmployeesController } from './employees.controller'
import { EmployeesRepository } from './employees.repository'
import { EmployeesService } from './employees.service'

@Module({
  controllers: [EmployeesController],
  providers: [
    EmployeeAlreadyRegisteredConstraint,
    EmployeesService,
    EmployeesRepository,
  ],
})
export class EmployeesModule {}
