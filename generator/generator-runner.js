#!/usr/bin/env node

const shell = require('shelljs')
const colors = require('colors')
const fs = require('fs')

var readdirRecursive = require('recursive-readdir')

const clientAppPath = './client'
const resourcesFilesPath = './generator/resources'
const totalSteps = 6
let stepsTaken = 1

const run = async () => {
  try {
    await executeStep('Initializing git repository', gitInit)
    await executeStep('Running create-react-app with TypeScript and SASS', createReactApp)
    await executeStep('Updating client resources', updateAppResources)
    await executeStep('Installing client dependencies', installDependencies)
    await executeStep('Removing unnecessary files', deleteUnnecessaryFiles)
    await executeStep('Update client package configuration', changeClientPackageFile)
    showSuccessMessage()
  } catch (error) {
    console.log(error, 'Something went wrong with the client generator'.red)
  }
}

const executeStep = async (message, callback) => {
  logStepHeaderMessage(message, stepsTaken++)

  await callback()
}

const gitInit = () => {
  shell.cd('..')
  shell.exec('git init')
}

const createReactApp = () => {
  return new Promise((resolve) => {
    const createReactAppCommand = `create-react-app ${clientAppPath} --typescript`

    const onSuccess = () => {
      console.log('\nReact app created'.green)
      resolve(true)
    }

    shell.exec(createReactAppCommand, onSuccess)
  })
}

const updateAppResources = () => {
  return new Promise(async (resolve) => {
    createFolders()
    const resourcesFiles = await mapResourcesFiles()
    copyResourceFiles(resourcesFiles, resolve)
  })
}

const createFolders = () => {
  console.log('Creating client folders')
  shell.mkdir(`${clientAppPath}/__mocks__`)
  shell.mkdir(`${clientAppPath}/src/api`)
  shell.mkdir(`${clientAppPath}/src/api/me`)
  shell.mkdir(`${clientAppPath}/src/config`)
  shell.mkdir(`${clientAppPath}/src/redux`)
  shell.mkdir(`${clientAppPath}/src/redux/ducks`)
  shell.mkdir(`${clientAppPath}/src/containers`)
  shell.mkdir(`${clientAppPath}/src/containers/app`)
  shell.mkdir(`${clientAppPath}/src/containers/connect`)
  shell.mkdir(`${clientAppPath}/src/containers/home`)
  shell.mkdir(`${clientAppPath}/src/containers/user`)
}

const mapResourcesFiles = async () => {
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

const copyResourceFiles = (resourcesFiles, resolve) => {
  console.log('Copying resource files')

  const configPromises = resourcesFiles.map((resource) => copyFile(resource))

  Promise.all(configPromises).then(() => {
    console.log(`${resourcesFiles.length} resources copied from generator to client`)
    resolve()
  })
}

const copyFile = (resource) => {
  return new Promise((resolve) => {
    const fromGeneratorResourcesPath = `${resourcesFilesPath}/${resource}`

    const toClientResourcesPath = `${clientAppPath}/${resource}`

    const onErrorHandler = (error) => {
      error && console.log(error.red)
      resolve()
    }

    fs.copyFile(fromGeneratorResourcesPath, toClientResourcesPath, onErrorHandler)
  })
}

const installDependencies = () => {
  return new Promise((resolve) => {
    shell.cd(`${clientAppPath}`)

    console.log('Installing DEV dependencies')
    shell.exec(
      'npm install -D coveralls enzyme enzyme-adapter-react-16 axios-mock-adapter redux-mock-store prettier tslint tslint-config-prettier tslint-consistent-codestyle redux-devtools-extension redux-actions',
    )

    console.log('Installing dependencies')
    shell.exec(
      `npm install -S redux github:wgrisa/redux-thunk-actions react-redux redux-thunk react-router-dom axios platform qs store query-string typescript`,
    )

    console.log('Installing @types')
    shell.exec(
      `npm install -D @types/node @types/react @types/react-dom @types/jest @types/react-redux @types/react-router-dom @types/platform @types/qs @types/store @types/query-string`,
    )

    if (process.env.NODE_ENV !== 'ci') {
      console.log('Installing sass')
      shell.cd('..')
      shell.exec(`npm run client-npm-i-sass`)
    }

    resolve(true)
  })
}

const deleteUnnecessaryFiles = () => {
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

const changeClientPackageFile = () => {
  const packagePath = process.env.NODE_ENV !== 'ci' ? `${clientAppPath}/package.json` : './package.json'
  const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'))

  packageContent.scripts['test-coverage'] = 'npm run test -- --coverage && cat ./coverage/lcov.info | coveralls'

  packageContent.jest = {
    collectCoverageFrom: [
      'src/**/*.{ts,tsx}',
      '!<rootDir>/node_modules/',
      '!<rootDir>/src/index.tsx',
      '!<rootDir>/src/registerServiceWorker.ts',
    ],
  }

  fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2))
}

const showSuccessMessage = () => {
  const successMessage = `\nSetup success! Welcome to AEboilerplate\n
Some stuff to do:\n
• commit right now if you want to have a baseline for the project
• read our documentation at (ctrl/cmd + click to open) https://github.com/agencyenterprise/aeboilerplate/blob/master/docs/documentation.md
• npm run dev to get the project going
• have fun!\n`.green

  console.log(successMessage)
}

const logStepHeaderMessage = (message, step) => {
  console.log(`\n${message}`.cyan)
  console.log(`[Step ${step}/${totalSteps}]\n`.yellow)
}

run()
