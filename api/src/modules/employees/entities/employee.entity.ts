import { Exclude, Expose, Type } from 'class-transformer'
import { Gender, Team } from '../models'

export class Employee {
  @Exclude({ toPlainOnly: true })
  readonly _id: string

  @Expose({ name: 'id' })
  get id() {
    return this._id
  }
  /**@property
   * Employee's birth date
   */
  @Type(() => Date)
  readonly birthDate: Date

  /**@property
   * Employee's social security number
   */
  readonly cpf: string

  /**@property
   * Employee's company email
   */
  readonly email: string

  /**@property
   * Employee's gender
   */
  @Type((typeHelp) => {
    return () => Gender[typeHelp.newObject as keyof typeof Gender]
  })
  readonly gender: Gender

  /**@property
   * Employee's full name
   */
  readonly name: string

  /**@property
   * The month and year when the employee started at the company
   */
  @Type(() => Date)
  readonly startDate: Date

  /**@property
   * Which team the employee belongs to
   */
  @Type((typeHelp) => {
    return () => Team[typeHelp.newObject as keyof typeof Team]
  })
  readonly team?: Team
}
