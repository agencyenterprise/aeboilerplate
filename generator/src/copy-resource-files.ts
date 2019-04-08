import { copyFile } from './core/copy-file'

export const copyResourceFiles = (resourcesFiles, resolve) => {
  console.log('Copying resource files')

  const configPromises = resourcesFiles.map((resource) => copyFile(resource))

  Promise.all(configPromises).then(() => {
    console.log(`${resourcesFiles.length} resources copied from generator to client`)
    resolve()
  })
}
