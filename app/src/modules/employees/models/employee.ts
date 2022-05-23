import { Expose, Type } from 'class-transformer'
import { Gender } from './gender'
import { Team } from './team'

export class Employee {
  @Expose({ name: '_id', toClassOnly: true })
  id!: string

  /**@property
   * Employee's birth date
   */
  /**@property
   * Employee's birth date
   */

  @Type(() => Date)
  birthDate!: Date

  /**@property
   * Employee's social security number
   */
  /**@property
   * Employee's social security number
   */
  cpf!: string

  /**@property
   * Employee's company email
   */

  /**@property
   * Employee's company email
   */
  email!: string

  /**@property
   * Employee's gender
   */
  /**@property
   * Employee's gender
   */
  gender!: Gender

  /**@property
   * Employee's full name
   */
  /**@property
   * Employee's full name
   */
  name!: string

  /**@property
   * The month and year when the employee started at the company
   */
  /**@property
   * The month and year when the employee started at the company
   */
  startDate!: Date

  /**@property
   * Which team the employee belongs to
   */
  /**@property
   * Which team the employee belongs to
   */
  team!: Team
}
