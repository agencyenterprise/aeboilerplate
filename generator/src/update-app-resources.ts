import { copyResourceFiles } from './copy-resource-files'
import { logStepHeaderMessage } from './core/log-step-header-message'
import { createFolders } from './create-folders'
import { mapResourcesFiles } from './map-resources-files'

export const updateAppResources = () => {
  return new Promise(async (resolve) => {
    logStepHeaderMessage('Updating client resources', 3)
    createFolders()
    const resourcesFiles = await mapResourcesFiles()
    copyResourceFiles(resourcesFiles, resolve)
  })
}
