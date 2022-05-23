import { getEmployees } from 'modules/employees/queries'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import {
  getEmployeesError,
  getEmployeesStart,
  getEmployeesSuccess,
  initialState,
  TableAction,
  tableReducer,
  TableState,
} from './reducer'

const TableContext = React.createContext<{
  state: TableState
  dispatch: React.Dispatch<TableAction>
}>({
  state: initialState,
  dispatch: () => {
    return
  },
})

export const TableProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(tableReducer, initialState)
  const { data, isError, error, refetch } = useQuery(
    getEmployees.name,
    getEmployees,
    {
      // Will only try to execute the query again once if an error occurs.
      retry: 1,
      refetchOnMount: false,
    },
  )
  const queryClient = useQueryClient()

  React.useEffect(() => {
    dispatch(getEmployeesStart())
  }, [])

  React.useEffect(() => {
    if (data) {
      dispatch(getEmployeesSuccess(data))
    }
  }, [data])

  React.useEffect(() => {
    if (!error) return

    const _error = error as any
    // api request validation message
    let responseMessage = _error.response?.data?.message
    // axios message
    if (responseMessage && typeof responseMessage !== 'string')
      responseMessage = _error.response?.message

    dispatch(getEmployeesError(responseMessage ?? _error?.message))
  }, [isError, error])

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  )
}

export const useTableContext = () => React.useContext(TableContext)
