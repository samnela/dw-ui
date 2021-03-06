const { join, resolve } = require('path')
const defu = require('defu')

const { addVariants } = require('./utils/tailwind')

module.exports = function () {
  // Inject components plugin
  this.addPlugin({
    src: join(__dirname, './plugins/plugins.js'),
    fileName: 'dewib/ui/utils/plugins.js'
  })

  // Inject i18n plugin
  this.addPlugin({
    src: join(__dirname, './plugins/i18n.js'),
    fileName: 'dewib/ui/plugins/i18n.js'
  })

  // Inject main plugin
  this.addPlugin({
    src: join(__dirname, './plugins/index.js'),
    fileName: 'dewib/ui/plugins/index.js'
  })

  // Inject config utils
  this.addTemplate({
    src: join(__dirname, './utils/config.js'),
    fileName: 'dewib/ui/utils/config.js'
  })

  // Inject modules
  this.nuxt.hook('components:dirs', (dirs) => {
    dirs.push({
      path: join(__dirname, 'components'),
      extensions: ['vue'],
      pathPrefix: false,
      prefix: 'dw'
    })
  })

  // Add purgeCSS content for tailwindcss
  this.nuxt.hook('tailwindcss:config', (config) => {
    config.purge.content.push(join(__dirname, 'utils/config.js'))
    config.purge.content.push(join(this.nuxt.options.rootDir, 'dewib/config.js'))

    // Extend properties
    config.theme.extend = config.theme.extend || {}
    config.theme.extend.zIndex = defu(config.theme.extend.zIndex, { '-1': '-1', 'dw-modal': 9001, 'dw-notification': 9002 })
    config.theme.extend.spacing = defu(config.theme.extend.spacing, { full: '100%' })
    config.theme.extend.minWidth = defu(config.theme.extend.minWidth, { 12: '3rem', 32: '8rem' })
    config.theme.extend.borderWidth = defu(config.theme.extend.borderWidth, { 6: '6px' })
    config.theme.extend.height = defu(config.theme.extend.height, { '3/2': '0.375rem' })

    // Extend variants
    config.variants.backgroundColor = utils => addVariants('backgroundColor', ['disabled'], utils)
    config.variants.opacity = utils => addVariants('opacity', ['responsive', 'disabled'], utils)
    config.variants.cursor = utils => addVariants('cursor', ['responsive', 'hover', 'focus', 'disabled'], utils)
    config.variants.textColor = utils => addVariants('textColor', ['disabled'], utils)

    config.plugins.push(require('@tailwindcss/custom-forms'))
  })

  // Add alias
  const componentsDir = resolve(__dirname, './components')
  this.nuxt.options.alias['~dewib/dw-ui/components'] = componentsDir
}
