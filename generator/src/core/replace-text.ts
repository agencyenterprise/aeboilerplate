import replace from 'replace-in-file'

import { clientAppPath } from './config'

export const replaceText = (resolve, replaceFrom, replaceTo) => {
  const options = {
    files: `${clientAppPath}/src/index.tsx`,
    from: replaceFrom,
    to: replaceTo,
  }

  try {
    replace.sync(options)
    resolve(true)
  } catch (error) {
    console.error('Error occurred updating index.tsx:', error.red)
    resolve(false)
  }
}
