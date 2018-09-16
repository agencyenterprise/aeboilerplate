import { getMe } from '../../services/me/get-me'

export const fetchMe = async (req, res) => {
  const user = await getMe(req)

  if (!user) {
    return res.sendStatus(401)
  }

  return res.status(200).send(user)
}
