export const getUserFromProfile = (profile) => {
  const {
    provider,
    name: { givenName, familyName },
    emails,
    photos,
  } = profile

  const email = emails && emails.length && emails[emails.length - 1].value
  const photoUrl = photos && photos.length && photos[photos.length - 1].value

  const newUser = {
    provider,
    firstName: givenName,
    lastName: familyName,
    photoUrl,
    email,
  }

  return newUser
}
