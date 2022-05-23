import axios from 'axios'

export default async function (data: any) {
  await axios.put(`${import.meta.env.VITE_API_URL}/employees/${data.id}`, data)
}
