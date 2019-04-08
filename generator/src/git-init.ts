import shell from 'shelljs'

import { logStepHeaderMessage } from './core/log-step-header-message'

export const gitInit = () => {
  logStepHeaderMessage('Initializing git repository', 1)
  shell.cd('..')
  shell.exec('git init')
}
