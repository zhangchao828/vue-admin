const defineConfig = require('@zc/admin/define')

module.exports = defineConfig({
  vite: true,
  port: 3006,
  webpack: {
    builtInExternals: false,
  },
})
