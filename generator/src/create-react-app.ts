import shell from 'shelljs'

import { clientAppPath } from './core/config'

export const createReactApp = () => {
  return new Promise((resolve) => {
    const createReactAppCommand = `create-react-app ${clientAppPath} --typescript --use-npm`

    const onSuccess = () => {
      console.log('\nReact app created'.green)
      resolve(true)
    }

    shell.exec(createReactAppCommand, onSuccess)
  })
}
