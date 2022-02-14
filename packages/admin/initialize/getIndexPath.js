const { join } = require('path')
const fs = require('fs-extra')

module.exports = function getIndexPath(dirPath, indexName = 'index') {
  const jsIndex = join(dirPath, `${indexName}.js`)
  const jsxIndex = join(dirPath, `${indexName}.jsx`)
  const tsxIndex = join(dirPath, `${indexName}.tsx`)
  const vueIndex = join(dirPath, `${indexName}.vue`)
  if (fs.pathExistsSync(jsIndex)) {
    return jsIndex
  }
  if (fs.pathExistsSync(jsxIndex)) {
    return jsxIndex
  }
  if (fs.pathExistsSync(tsxIndex)) {
    return tsxIndex
  }
  if (fs.pathExistsSync(vueIndex)) {
    return vueIndex
  }
  return ''
}
