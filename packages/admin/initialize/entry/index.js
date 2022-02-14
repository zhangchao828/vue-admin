const { join } = require('path')
const { __entryDir } = require('@zc/dev-utils/paths')
const fs = require('fs-extra')
const { getConfig } = require('@zc/dev-utils/project')

const { mf } = getConfig().webpack

module.exports = function createEntry() {
  fs.copySync(join(__dirname, 'App.vue'), join(__entryDir, 'App.vue'))
  if (mf?.remotes) {
    fs.outputFileSync(join(__entryDir, 'index.js'), `import('./bootstrap')`)
    fs.copySync(join(__dirname, 'bootstrap.js'), join(__entryDir, 'bootstrap.js'))
  } else {
    fs.copySync(join(__dirname, 'bootstrap.js'), join(__entryDir, 'index.js'))
  }
}
