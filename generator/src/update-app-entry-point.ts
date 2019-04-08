import { logStepHeaderMessage } from './core/log-step-header-message'
import { replaceText } from './core/replace-text'

export const updateAppEntryPoint = () => {
  return new Promise((resolve) => {
    logStepHeaderMessage('Updating react app entry point', 4)

    const replaceFrom = "import App from './App'"
    const replaceTo = "import { App } from './containers/app/App'"

    replaceText(resolve, replaceFrom, replaceTo)
  })
}
