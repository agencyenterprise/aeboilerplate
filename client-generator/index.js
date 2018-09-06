#!/usr/bin/env node

const resources = ['.editorconfig', '.gitignore', '.prettierrc', 'README.md', 'tsconfig.json', 'tslint.json']

let shell = require('shelljs')
let colors = require('colors')
let fs = require('fs')

let appDirectory = `${process.cwd()}/client`

const runCreateReactApp = () => {
  return new Promise((resolve) => {
    console.log('\nRun create-react-app with TypeScript'.cyan)
    shell.exec('create-react-app client --scripts-version=react-scripts-ts', () => {
      console.log('\nCreated react app'.green)
      resolve(true)
    })
  })
}

const openAppFolder = () => {
  return new Promise((resolve) => {
    shell.cd('client')
    console.log('\nMove into app directory'.cyan)
    resolve(true)
  })
}

const installDependences = () => {
  return new Promise((resolve) => {
    console.log('\nInstalling DEV dependences'.cyan)
    shell.exec('npm install -D prettier tslint tslint-config-prettier tslint-consistent-codestyle')

    console.log('\nInstalling dependences'.cyan)
    shell.exec(`npm install -S redux redux-thunk react-router-dom`)

    shell.cd('..')
    resolve(true)
  })
}

const updateAppConfig = () => {
  return new Promise((resolve) => {
    const configPromises = []
    resources.forEach((resource) => {
      configPromises.push(createFile(resource))
    })
    Promise.all(configPromises).then(() => {
      console.log('\nConfigurations updated'.cyan)
      resolve()
    })
  })
}

const createFile = (resource) => {
  return new Promise((resolve) => {
    fs.copyFile(`client-generator/client-resources/${resource}`, `${appDirectory}/${resource}`, (error) => {
      error && console.log(error.red)
      resolve()
    })
  })
}

const run = async () => {
  try {
    await runCreateReactApp()
    await openAppFolder()
    await installDependences()
    await updateAppConfig()
    console.log('\nAll done'.green)
  } catch (error) {
    console.log(error, 'Something went wrong while trying to create a new React app using create-react-app'.red)
  }
}

run()
