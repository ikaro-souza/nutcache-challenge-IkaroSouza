import { getNumericEnumValues } from 'modules/common/utils'
import { HomePage } from 'modules/employees'
import { Gender } from 'modules/employees/models'
import './App.css'

getNumericEnumValues(Gender)

function App() {
  return <HomePage />
}

export default App
