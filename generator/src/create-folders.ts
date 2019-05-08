import shell from 'shelljs'

import { clientAppPath } from './core/config'

export const createFolders = () => {
  console.log('Creating client folders')
  shell.mkdir(`${clientAppPath}/__mocks__`)
  shell.mkdir(`${clientAppPath}/src/api`)
  shell.mkdir(`${clientAppPath}/src/api/me`)
  shell.mkdir(`${clientAppPath}/src/config`)
  shell.mkdir(`${clientAppPath}/src/redux`)
  shell.mkdir(`${clientAppPath}/src/redux/ducks`)
  shell.mkdir(`${clientAppPath}/src/containers`)
  shell.mkdir(`${clientAppPath}/src/containers/app`)
  shell.mkdir(`${clientAppPath}/src/containers/connect`)
  shell.mkdir(`${clientAppPath}/src/containers/home`)
  shell.mkdir(`${clientAppPath}/src/containers/user`)
}
