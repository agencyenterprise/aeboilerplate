import axios from 'axios'

export default async function get() {
  const { data } = await axios({
    method: 'get',
    url: '/',
  })

  return data
}
