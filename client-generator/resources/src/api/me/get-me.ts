import axios from 'axios'

export const getMeData = async () => {
  const { data } = await axios({
    method: 'get',
    url: '/me',
  })

  return { me: data }
}
