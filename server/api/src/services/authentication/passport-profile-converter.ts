export const getUser = (profile): any => {
  const {
    provider,
    name: { givenName, familyName },
    emails,
    photos,
  } = profile

  const email = emails.length && emails.pop().value
  const photoUrl = photos.length && photos.pop().value

  const newUser = {
    provider: provider,
    firstName: givenName,
    lastName: familyName,
    photoUrl: photoUrl,
    email,
  }

  return newUser
}
