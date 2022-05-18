import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common'
import { Response } from 'express'
import {
  EmployeesModuleException,
  EmployeesModuleExceptionType,
} from '../models/employeeModuleException'

@Catch(EmployeesModuleException)
export class EmployeesModuleExceptionFilter implements ExceptionFilter {
  catch(error: EmployeesModuleException, host: ArgumentsHost) {
    const [httpStatus, message] =
      this.getStatusCodeAndMessageForExceptionType(error)
    const response = host.switchToHttp().getResponse<Response>()
    response.status(httpStatus as number).json({
      statusCode: httpStatus,
      message,
    })
  }

  private getStatusCodeAndMessageForExceptionType(
    error: EmployeesModuleException,
  ) {
    switch (error.type) {
      case EmployeesModuleExceptionType.ENTITY_NOT_FOUND:
        return [HttpStatus.NOT_FOUND, error.message]

      default:
        return [HttpStatus.BAD_REQUEST, 'Bad request']
    }
  }
}
