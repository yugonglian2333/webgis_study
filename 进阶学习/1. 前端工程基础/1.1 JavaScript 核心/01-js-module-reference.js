export const moduleName = 'JavaScript 模块化参考'

export function formatLayerType(type) {
  const typeMap = {
    vector: '矢量图层',
    raster: '栅格图层',
    terrain: '地形图层'
  }

  return typeMap[type] || '未知图层'
}

export function createLayerSummary(layer) {
  return `${layer.name}：${formatLayerType(layer.type)}`
}

export default function createLayer(name, type, visible = true) {
  return {
    name,
    type,
    visible
  }
}

/*
  在真实项目里可以这样使用：

  import createLayer, {
    moduleName,
    formatLayerType,
    createLayerSummary
  } from './01-js-module-reference.js'

  注意：
  直接双击 HTML 用 file:// 打开时，部分浏览器会拦截 ES Module。
  学 Vue3 + Vite 后，import/export 会由开发服务器正常处理。
*/
