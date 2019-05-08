import shell from 'shelljs'

export const gitInit = () => {
  shell.cd('..')
  shell.exec('git init')
}
