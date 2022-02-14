const createRoot = require('./root')
const createEntry = require('./entry')
const { isDev } = require('@zc/dev-utils/env')
const { getConfig } = require('@zc/dev-utils/project')

const { useFileRouter } = getConfig()

module.exports = function initialize() {
  createRoot()
  createEntry()
  if (useFileRouter) {
    // 文件式路由
    require('./fileRouter')()
  }
  if (isDev) {
    require('@zc/dev-utils/mock').init()
  }
}
