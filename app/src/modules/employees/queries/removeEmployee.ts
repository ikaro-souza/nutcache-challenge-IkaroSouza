import axios from 'axios'

export default async function (id: string) {
  await axios.delete(`${import.meta.env.VITE_API_URL}/employees/${id}`)
}
