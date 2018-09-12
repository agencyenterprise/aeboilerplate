import axios from 'axios'

export const get = async () => {
  const { data } = await axios({
    method: 'get',
    url: '/',
  })

  return data
}
