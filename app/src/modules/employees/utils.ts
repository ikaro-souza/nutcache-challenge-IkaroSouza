import { Gender, Team } from './models'

export const genderDisplayName = (gender: Gender) => {
  switch (gender) {
    case Gender.male:
      return 'Masculine'

    case Gender.female:
      return 'Feminine'

    default:
      return 'Other'
  }
}

export const teamDisplayName = (team: Team) => {
  switch (team) {
    case Team.backend:
      return 'Back-end'

    case Team.frontend:
      return 'Front-end'

    case Team.mobile:
      return 'Mobile'

    default:
      return '-'
  }
}
