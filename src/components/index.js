import packageJson from '../../package.json'
import TreeTable from './tree-table'

TreeTable.install = (Vue, options = {}) => {
  let prefix = options.prefix
  Vue.component(prefix ? `${prefix}-${TreeTable.name}` : TreeTable.name, TreeTable)
}

const components = {
  TreeTable
}

function install (Vue, options = {}) {
  for (let name in components) {
    components[name].install(Vue, options)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version: packageJson.version,
  install,
  TreeTable
}
