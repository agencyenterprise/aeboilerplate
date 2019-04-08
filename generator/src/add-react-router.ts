import { logStepHeaderMessage } from './core/log-step-header-message'
import { replaceText } from './core/replace-text'

export const addReactRouter = () => {
  return new Promise((resolve) => {
    logStepHeaderMessage('Adding react router', 7)

    const replaceFrom = '<App />'
    const replaceTo = '<Router>\n<Route path="/" component={App} />\n</Router>'

    replaceText(resolve, replaceFrom, replaceTo)
  })
}
