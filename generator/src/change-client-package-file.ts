import * as fs from 'fs'

import { clientAppPath } from './core/config'

export const changeClientPackageFile = () => {
  const packagePath = `${clientAppPath}/package.json`
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
