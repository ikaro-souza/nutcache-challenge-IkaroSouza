import { maskCpf } from 'modules/common/masks'
import { Employee } from 'modules/employees/models'
import { genderDisplayName, teamDisplayName } from 'modules/employees/utils'
import moment from 'moment'
import { Row } from './reducer'

const formatBirthDate = (date: Date) => {
  return moment(date).format('l')
}

const formatStartDate = (date: Date) => {
  return moment(date).format('MM/yyyy')
}

export const mapEmployeeToRow = (employee: Employee): Row => {
  const cpf = maskCpf(employee.cpf)
  const birthDate = formatBirthDate(employee.birthDate)
  const splittedName = employee.name.split(' ')
  const name = `${splittedName[0]} ${splittedName[splittedName.length - 1]}`
  const gender = genderDisplayName(employee.gender)
  const startDate = formatStartDate(employee.startDate)
  const team = teamDisplayName(employee.team)

  return {
    id: employee.id,
    cpf,
    birthDate,
    email: employee.email,
    name,
    gender,
    startDate,
    team,
  }
}
