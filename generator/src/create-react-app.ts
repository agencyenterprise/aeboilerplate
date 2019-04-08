import shell from 'shelljs'

import { clientAppPath } from './core/config'
import { logStepHeaderMessage } from './core/log-step-header-message'

export const createReactApp = () => {
  return new Promise((resolve) => {
    logStepHeaderMessage('Running create-react-app with TypeScript and SASS', 2)

    const createReactAppCommand = `npx create-react-app ${clientAppPath} --typescript --use-npm`

    const onSuccess = () => {
      console.log('\nReact app created'.green)
      resolve(true)
    }

    shell.exec(createReactAppCommand, onSuccess)
  })
}
