import { Type } from 'class-transformer'
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator'
import { EmployeeAlreadyRegistered, IsValidCpf } from '../config/validation'
import { Gender, Team } from '../models/'

export class CreateEmployeeDto {
  /**@property
   * Employee's birth date
   */
  @Type(() => Date)
  @IsDate({
    message: (args) => {
      return `${args.property} must be a valid date`
    },
  })
  readonly birthDate: Date

  /**@property
   * Employee's social security number
   */
  @IsNotEmpty()
  @IsValidCpf()
  @EmployeeAlreadyRegistered()
  readonly cpf: string

  /**@property
   * Employee's company email
   */
  @IsEmail()
  readonly email: string

  /**@property
   * Employee's gender
   */
  @IsEnum(Gender)
  readonly gender: Gender

  /**@property
   * Employee's full name
   */
  @IsNotEmpty()
  readonly name: string

  /**@property
   * The month and year when the employee started at the company
   */
  @Type(() => Date)
  @IsDate({
    message: (args) => {
      return `${args.property} must be a valid date`
    },
  })
  readonly startDate: Date

  /**@property
   * Which team the employee belongs to
   */
  @IsOptional()
  @IsEnum(Team)
  readonly team?: Team
}
