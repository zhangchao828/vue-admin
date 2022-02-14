const fs = require('fs')
const path = require('path')
const { __pages } = require('@zc/dev-utils/paths')
const getIndex = require('../getIndexPath')

const with$Reg = /\[[0-9a-zA-Z_.]+\$]/g
const without$Reg = /\[[0-9a-zA-Z_.]+]/g
function getRoutePath(_path) {
  const realFilePath = _path.substring(__pages.length).replace(/\\/g, '/')
  let filePath = realFilePath.replace(/(\/index)?\.vue|[jt]sx?/g, '')
  if (!filePath || filePath === '/') {
    return '/'
  }
  if (with$Reg.test(filePath)) {
    filePath = filePath.replace(with$Reg, (a) => {
      return a.replace('[...]', '*').replace('[', ':').replace('$]', '?')
    })
  }
  if (without$Reg.test(filePath)) {
    filePath = filePath.replace(without$Reg, (a) => {
      return a.replace('[...]', '*').replace('[', ':').replace(']', '')
    })
  }
  return filePath
}
function getComponent(_path) {
  const realFilePath = _path.substring(__pages.length).replace(/\\/g, '/')
  return `()=>import('@/pages${realFilePath}')`
}
function getAll() {
  // 先遍历一遍给其建立深度索引
  function readdir(dir) {
    const result = {}
    if (dir !== __pages) {
      result.path = getRoutePath(dir)
      const layoutFile = getIndex(dir, 'layout')
      const indexFile = getIndex(dir)
      if (layoutFile) {
        result.component = getComponent(layoutFile)
        result.layout = true
      } else if (indexFile) {
        result.component = getComponent(indexFile)
        result.layout = false
      }
    }
    const files = fs.readdirSync(dir) //同步拿到文件目录下的所有文件名
    result.children = files
      .map((file) => {
        const subPath = path.join(dir, file) //拼接为相对路径
        const stats = fs.statSync(subPath) //拿到文件信息对象
        if (stats.isDirectory()) {
          // 判断是否为文件夹类型
          return readdir(subPath) //递归读取文件夹
        }
        if (file.startsWith('index.') && result.layout === false) {
          return false
        }
        if (file.startsWith('layout.') && result.layout === true) {
          return false
        }
        return {
          // 构造文件数据
          path: getRoutePath(subPath),
          component: getComponent(subPath),
        }
      })
      .filter(Boolean)
    return result
  }
  return readdir(__pages)
}

module.exports = () => {
  console.log(JSON.stringify(getAll(), null, 2))
}
