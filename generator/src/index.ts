#!/usr/bin/env ts-node

import 'colors'

import { addReactRouter } from './add-react-router'
import { addReduxStoreProvider } from './add-redux-store-provider'
import { changeClientPackageFile } from './change-client-package-file'
import { deleteUnnecessaryFiles } from './core/delete-unnecessary-files'
import { createReactApp } from './create-react-app'
import { gitInit } from './git-init'
import { installDependencies } from './install-dependencies'
import { showSuccessMessage } from './show-success-message'
import { updateAppEntryPoint } from './update-app-entry-point'
import { updateAppResources } from './update-app-resources'

const run = async () => {
  try {
    gitInit()
    await createReactApp()
    await updateAppResources()
    await updateAppEntryPoint()
    await addReduxStoreProvider()
    await addReactRouter()
    await installDependencies()
    deleteUnnecessaryFiles()
    changeClientPackageFile()
    showSuccessMessage()
  } catch (error) {
    console.log(error, 'Something went wrong with the client generator'.red)
  }
}

run()
