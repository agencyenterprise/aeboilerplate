export const getUserFromProfile = (profile) => {
  const {
    provider,
    name: { givenName, familyName },
    emails,
    photos,
  } = profile

  const email = emails.length && emails.pop().value
  const photoUrl = photos.length && photos.pop().value

  const newUser = {
    provider,
    firstName: givenName,
    lastName: familyName,
    photoUrl,
    email,
  }

  return newUser
}
