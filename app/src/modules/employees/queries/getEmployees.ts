import axios from 'axios'
import { Employee } from '../models'

export default async function () {
  const response = await axios.get<Employee[]>(
    `${import.meta.env.VITE_API_URL}/employees`,
  )

  return response.data
}
