import * as fs from 'fs'

import { clientAppPath } from './config'

export const deleteUnnecessaryFiles = () => {
  const srcPath = `${clientAppPath}/src`
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
