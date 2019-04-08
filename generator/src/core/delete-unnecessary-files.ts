import * as fs from 'fs'

import { clientAppPath } from './config'
import { logStepHeaderMessage } from './log-step-header-message'

export const deleteUnnecessaryFiles = () => {
  logStepHeaderMessage('Removing unnecessary files', 9)
  const srcPath = process.env.NODE_ENV !== 'ci' ? `${clientAppPath}/src` : './src'
  const files = fs.readdirSync(srcPath)
  const isDirectory = (path) => fs.lstatSync(path).isDirectory()

  files.forEach((file) => {
    const fullFilePath = `${srcPath}/${file}`
    const whitelistFiles = ['index.tsx', 'index.scss', 'serviceWorker.ts']

    if (!whitelistFiles.includes(file) && !isDirectory(fullFilePath)) {
      console.log('deleting unnecessary file: ', file)
      fs.unlinkSync(fullFilePath)
    }
  })
}
