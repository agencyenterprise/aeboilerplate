import { getMe } from '../../services/me/get-me'

export const fetchMe = async (req, res) => {
  const user = await getMe(req)

  return res.status(200).send(user)
}
