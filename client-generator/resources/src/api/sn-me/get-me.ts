import axios from 'axios'

export const getMe = async () => {
  const { data } = await axios({
    method: 'get',
    url: '/me',
  })

  return data
}
