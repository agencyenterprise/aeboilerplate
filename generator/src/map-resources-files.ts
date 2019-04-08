import readdirRecursive from 'recursive-readdir'

import { resourcesFilesPath } from './core/config'

export const mapResourcesFiles = async () => {
  console.log('Mapping resource files')

  const resourcesFiles = []
  const fileNames = await readdirRecursive(resourcesFilesPath)

  fileNames.forEach((fileName) => {
    fileName = fileName.replace(`generator/resources/`, '').replace(`generator\\resources\\`, '')
    console.log('\tAdding resource', fileName)
    resourcesFiles.push(fileName)
  })

  return resourcesFiles
}
