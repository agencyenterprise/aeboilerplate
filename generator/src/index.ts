#!/usr/bin/env ts-node

import 'colors'

import { changeClientPackageFile } from './change-client-package-file'
import { deleteUnnecessaryFiles } from './core/delete-unnecessary-files'
import { logStepHeaderMessage } from './core/log-step-header-message'
import { createReactApp } from './create-react-app'
import { gitInit } from './git-init'
import { installDependencies } from './install-dependencies'
import { showSuccessMessage } from './show-success-message'
import { updateAppResources } from './update-app-resources'

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

run()
