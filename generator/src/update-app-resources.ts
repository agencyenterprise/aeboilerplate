import { copyResourceFiles } from './copy-resource-files'
import { createFolders } from './create-folders'
import { mapResourcesFiles } from './map-resources-files'

export const updateAppResources = () => {
  return new Promise(async (resolve) => {
    createFolders()
    const resourcesFiles = await mapResourcesFiles()
    copyResourceFiles(resourcesFiles, resolve)
  })
}
