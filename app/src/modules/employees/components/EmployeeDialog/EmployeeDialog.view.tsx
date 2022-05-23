import { Button } from 'modules/common'
import { getNumericEnumValues } from 'modules/common/utils'
import moment from 'moment'
import React from 'react'
import { Gender, Team } from '../../models'
import { genderDisplayName, teamDisplayName } from '../../utils'
import { EmployeeDialogForm } from './reducer'

interface EmployeeDialogViewProps {
  edit: boolean
  error?: any
  formData: EmployeeDialogForm
  loading: boolean
  open: boolean
  onBirthDateChange: React.ChangeEventHandler
  onCpfChange: React.ChangeEventHandler
  onEmailChange: React.ChangeEventHandler
  onGenderChange: React.ChangeEventHandler
  onNameChange: React.ChangeEventHandler
  onTeamChange: React.ChangeEventHandler
  onStartDateChange: React.ChangeEventHandler
  onClose: VoidFunction
  onSubmit: React.FormEventHandler
}

export const EmployeeDialogView: React.FC<EmployeeDialogViewProps> = ({
  edit,
  error,
  formData,
  loading,
  open,
  onBirthDateChange,
  onCpfChange,
  onEmailChange,
  onGenderChange,
  onNameChange,
  onTeamChange,
  onStartDateChange,
  onClose,
  onSubmit,
}) => {
  const { birthDate, cpf, email, gender, name, startDate, team } = formData

  return (
    <>
      <div
        className={`fixed ${
          open ? 'bottom-0' : '-bottom-full -translate-y-full'
        } left-0 max-h-full-4 mx-auto overflow-y-auto right-0 rounded-t-lg ${
          open ? 'visible' : 'hidden'
        } w-full z-50`}
      >
        <div className="bg-white border-0 max-w-screen-md mx-auto relative rounded-t-lg shadow-lg w-full">
          {/*content*/}
          <form
            className="flex flex-col relative w-full"
            id="employee-form"
            onSubmit={onSubmit}
          >
            {/*header*/}
            <div className="p-4 rounded-t md:px-8">
              <h6 className="font-semibold text-base text-center">
                {!edit ? 'New employee' : 'Edit employee'}
              </h6>
            </div>
            {/*body*/}
            <div className="flex-auto relative p-4 md:px-8">
              <fieldset aria-required className="mb-4" name="name">
                <label className="mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="block duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={onNameChange}
                />
              </fieldset>
              <fieldset
                aria-required
                className="mb-4"
                name="employee-birth-date"
              >
                <label className="mb-2" htmlFor="birth-date">
                  Birth date
                </label>
                <input
                  className="block duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="birth-date"
                  name="birth-date"
                  type="date"
                  required
                  value={birthDate && moment(birthDate).format('YYYY-MM-DD')}
                  onChange={onBirthDateChange}
                />
              </fieldset>
              <fieldset aria-required className="mb-4" name="employee-gender">
                <label className="mb-2" htmlFor="gender">
                  Gender
                </label>
                <select
                  className="duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="gender"
                  name="gender"
                  value={gender}
                  defaultValue={-1}
                  onChange={onGenderChange}
                >
                  <>
                    <option value={-1}>Please select a gender</option>
                    {getNumericEnumValues(Gender).map((g) => (
                      <option key={g} value={g}>
                        {genderDisplayName(g)}
                      </option>
                    ))}
                  </>
                </select>
              </fieldset>
              <fieldset aria-required className="mb-4" name="employee-email">
                <label className="mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                />
              </fieldset>
              <fieldset aria-required className="mb-4" name="employee-cpf">
                <label className="mb-2" htmlFor="cpf">
                  CPF
                </label>
                <input
                  className="block duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="cpf"
                  inputMode="numeric"
                  name="cpf"
                  required
                  type="text"
                  value={cpf}
                  onChange={onCpfChange}
                />
              </fieldset>
              <fieldset
                aria-required
                className="mb-4"
                name="employee-start-date"
              >
                <label className="mb-2" htmlFor="start-date">
                  Start date
                </label>
                <input
                  className="block duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="start-date"
                  name="start-date"
                  required
                  type="date"
                  value={startDate && moment(startDate).format('YYYY-MM-DD')}
                  onChange={onStartDateChange}
                />
              </fieldset>
              <fieldset name="employee-team">
                <label className="mb-2" htmlFor="team">
                  Team
                </label>
                <select
                  className="duration-75 ease-out form-input w-full rounded-md border focus:border-teal-400 focus:ring focus:ring-teal-300 focus:ring-opacity-50 transition-all"
                  id="team"
                  name="team"
                  value={team}
                  defaultValue={-1}
                  onChange={onTeamChange}
                >
                  <>
                    <option value={-1}>Please Select a team (optional)</option>
                    {getNumericEnumValues(Team).map((t) => (
                      <option className="w-fit" key={t} value={t}>
                        {teamDisplayName(t)}
                      </option>
                    ))}
                  </>
                </select>
              </fieldset>
            </div>
            {(error || loading) && (
              <div className="border-t p-4">
                <p
                  className={`font-medium text-center ${
                    loading ? '' : 'text-red-500'
                  } text-sm`}
                >
                  {loading ? 'Please wait...' : error}
                </p>
              </div>
            )}
            {/*footer*/}
            <div className="border border-t border-solid flex flex-col items-stretch p-4 md:px-8">
              <Button
                className="bg-transparent text-base text-black disabled:text-gray-400"
                disabled={loading}
                type="button"
                onClick={() => onClose()}
              >
                Close
              </Button>
              <Button
                className="bg-transparent font-semibold text-base text-teal-400 disabled:text-gray-400"
                disabled={loading}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
      {open && (
        <div
          className="opacity-25 fixed inset-0 z-40 bg-black w-full"
          onClick={() => onClose()}
        ></div>
      )}
    </>
  )
}
