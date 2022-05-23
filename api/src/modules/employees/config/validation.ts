import { Injectable } from '@nestjs/common'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'
import { EmployeesRepository } from '../employees.repository'

const unmaskedCpfRegex = /^\d{3}\d{3}\d{3}\d{2}$/
const maskedCpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/

export const IsValidCpf =
  (validationOptions?: ValidationOptions) =>
  (object: unknown, propertyName: string) => {
    registerDecorator({
      constraints: [propertyName],
      name: 'isValidCpf',
      propertyName: propertyName,
      target: object.constructor,
      validator: {
        defaultMessage: (args) => {
          const validationMessage = validationOptions?.message
          if (typeof validationMessage === 'string') return validationMessage
          else if (typeof validationMessage === 'function')
            return validationMessage(args)

          return `${args.property} must be a valid CPF`
        },
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints
          const relatedValue = (args.object as any)[relatedPropertyName]
          return (
            typeof value === 'string' &&
            typeof relatedValue === 'string' &&
            (value.match(unmaskedCpfRegex) !== null ||
              value.match(maskedCpfRegex) !== null)
          )
        },
      },
    })
  }

@ValidatorConstraint({ async: true })
@Injectable()
export class EmployeeAlreadyRegisteredConstraint
  implements ValidatorConstraintInterface
{
  constructor(readonly repository: EmployeesRepository) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (typeof value !== 'string') return false
    else if (value.length === 9 && value.match(unmaskedCpfRegex) === null)
      return false
    else if (value.length === 14 && value.match(maskedCpfRegex) === null)
      return false

    const employee = await this.repository.findByCpf(value)
    return !employee
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'Employee with this CPF already is registered'
  }
}

export const EmployeeAlreadyRegistered =
  (validationOptions?: ValidationOptions) =>
  (object: unknown, propertyName: string) => {
    registerDecorator({
      constraints: [propertyName],
      name: 'employeeAlreadyRegistered',
      propertyName: propertyName,
      target: object.constructor,
      validator: EmployeeAlreadyRegisteredConstraint,
    })
  }
