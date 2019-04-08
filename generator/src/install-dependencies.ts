import shell from 'shelljs'

import { logStepHeaderMessage } from './core/log-step-header-message'
import { clientAppPath } from './core/config'

export const installDependencies = () => {
  return new Promise((resolve) => {
    logStepHeaderMessage('Installing client dependencies', 8)
    shell.exec(`npm run client-npm-i`)

    const dependencies = [
      'redux',
      'github:wgrisa/redux-thunk-actions',
      'react-redux',
      'redux-thunk',
      'react-router-dom',
      'axios',
      'platform',
      'qs',
      'store',
      'query-string',
    ]

    const devDependencies = [
      'coveralls',
      'enzyme',
      'enzyme-adapter-react-16',
      'axios-mock-adapter',
      'redux-mock-store',
      'prettier',
      'tslint',
      'tslint-config-prettier',
      'tslint-consistent-codestyle',
      'redux-devtools-extension',
      'redux-actions',
      '@types/react-redux',
      '@types/react-router-dom',
      '@types/platform',
      '@types/qs',
      '@types/store',
    ]

    shell.exec(`npm run client-npm-i -- -S ${dependencies.join(' ')}`)
    shell.exec(`npm run client-npm-i -- -D --unsafe-perm ${devDependencies.join(' ')}`)

    shell.cd(`${clientAppPath}`)
    shell.exec(`npm i node-sass -D`)
    shell.cd('..')

    shell.exec(`npm run client-npm -- rebuild node-sass --force`)

    resolve(true)
  })
}
