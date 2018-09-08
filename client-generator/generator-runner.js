#!/usr/bin/env node

const shell = require('shelljs')
const colors = require('colors')
const fs = require('fs')
var readdirRecursive = require('recursive-readdir')
const replace = require('replace-in-file')

const clientGeneratorPath = `${process.cwd()}`
const clientAppPath = '../client'
const resourcesFilesPath = './resources'

const run = async () => {
  try {
    await createReactApp()
    await updateAppConfig()
    await setupAxios()
    await openAppFolder()
    await installDependences()
    console.log('Client project created successfully! Happy hacking!'.green)
  } catch (error) {
    console.log(error, 'Something went wrong with the client generator'.red)
  }
}

const createReactApp = () => {
  return new Promise((resolve) => {
    console.log('\nRunning create-react-app with TypeScript and SASS (@petejkim/react-scripts-ts-sass)'.cyan)

    const createReactAppCommand = `create-react-app ${clientAppPath} --scripts-version="@petejkim/react-scripts-ts-sass" --use-npm`

    const onSuccess = () => {
      console.log('\nReact app created'.green)
      resolve(true)
    }

    shell.exec(createReactAppCommand, onSuccess)
  })
}

const updateAppConfig = () => {
  return new Promise(async (resolve) => {
    const resourcesFiles = []

    shell.mkdir('../client/src/api')
    shell.mkdir('../client/src/config')

    console.log('\nMapping resource files'.cyan)

    const files = await readdirRecursive(resourcesFilesPath)
    files.forEach((file) => {
      file = file.replace('resources/', '')
      console.log('Adding resource file', file)
      resourcesFiles.push(file)
    })

    console.log('\nCopying resource files'.cyan)

    const configPromises = resourcesFiles.map((resource) => copyResourceFile(resource))
    Promise.all(configPromises).then(() => {
      console.log(`\n${resourcesFiles.length} resources copied from generator to client`.cyan)
      resolve()
    })
  })
}

const copyResourceFile = (resource) => {
  return new Promise((resolve) => {
    const fromGeneratorResourcesPath = `${clientGeneratorPath}/resources/${resource}`
    const toClientResourcesPath = `${clientAppPath}/${resource}`
    const onErrorHandler = (error) => {
      error && console.log(error.red)
      resolve()
    }

    fs.copyFile(fromGeneratorResourcesPath, toClientResourcesPath, onErrorHandler)
  })
}

const setupAxios = () => {
  return new Promise((resolve) => {
    const replaceFrom = "import registerServiceWorker from './registerServiceWorker'"
    const replaceTo =
      "import registerServiceWorker from './registerServiceWorker' \n\nimport setupAxios from './api/setup-axios' \n\nsetupAxios()"
    const options = {
      files: '../client/src/index.tsx',
      from: replaceFrom,
      to: replaceTo,
    }

    try {
      const changes = replace.sync(options)
      console.log('Modified files:', changes.join(', '))
      resolve(true)
    } catch (error) {
      console.error('Error occurred:', error)
      resolve(false)
    }
  })
}

const openAppFolder = () => {
  return new Promise((resolve) => {
    shell.cd(`${clientAppPath}`)
    console.log('\nOpening client folder'.cyan)
    resolve(true)
  })
}

const installDependences = () => {
  return new Promise((resolve) => {
    console.log('\nInstalling DEV dependences'.cyan)
    shell.exec('npm install -D prettier tslint tslint-config-prettier tslint-consistent-codestyle')

    console.log('\nInstalling dependencies'.cyan)
    shell.exec(`npm install -S redux redux-thunk react-router-dom axios platform qs`)

    resolve(true)
  })
}

run()
