import { totalSteps } from './config'

export const logStepHeaderMessage = (message, step) => {
  console.log(`\n${message}`.cyan)
  console.log(`[Step ${step}/${totalSteps}]\n`.yellow)
}
