import { logStepHeaderMessage } from './core/log-step-header-message'
import { replaceText } from './core/replace-text'

export const addReduxStoreProvider = () => {
  return new Promise((resolve) => {
    logStepHeaderMessage('Adding redux store provider', 6)

    const replaceFrom = '<App />'
    const replaceTo = '<Provider store={store}>\n<App />\n</Provider>'

    replaceText(resolve, replaceFrom, replaceTo)
  })
}
