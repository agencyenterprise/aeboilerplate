export const showSuccessMessage = () => {
  const successMessage = `\nSetup success! Welcome to AEboilerplate\n
Some stuff to do:\n
• commit right now if you want to have a baseline for the project
• read our documentation at https://github.com/agencyenterprise/aeboilerplate/blob/master/docs/documentation.md
• npm run dev to get the project going
• have fun!\n`.green

  console.log(successMessage)
}
