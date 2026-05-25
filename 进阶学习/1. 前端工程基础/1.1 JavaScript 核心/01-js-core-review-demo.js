const topics = [
  ['变量与类型', '保存数据，理解原始类型和引用类型的差异。'],
  ['流程与函数', '用条件、循环和函数组织可复用逻辑。'],
  ['对象与数组', '描述复杂数据，并对列表进行筛选、转换、统计。'],
  ['DOM 与事件', '查找页面元素，响应用户操作，更新页面状态。'],
  ['异步编程', '处理接口请求、定时器、地图数据加载等不会立即完成的任务。'],
  ['JSON 与存储', '完成对象和字符串互转，并把少量状态保存到浏览器。'],
  ['模块化', '把不同能力拆成多个文件，再通过导入导出组合。']
]

const functionIndex = [
  ['renderList', '把数组数据渲染成页面列表。'],
  ['log', '把标题和结果输出到黑色控制台区域。'],
  ['formatValue', '把对象、数组、字符串等值统一转成可读文本。'],
  ['createLayer', '用对象封装一个 WebGIS 图层配置。'],
  ['groupBy', '把数组按指定字段分组。'],
  ['sleep', '返回 Promise，用于模拟异步等待。'],
  ['fakeFetchLayers', '模拟从接口获取图层列表。'],
  ['runVariablesDemo', '演示变量、类型判断和类型转换。'],
  ['runFunctionDemo', '演示普通函数、箭头函数、闭包、this。'],
  ['runObjectArrayDemo', '演示对象、数组和常用数组方法。'],
  ['runToolDemo', '演示字符串、数字、日期、Math。'],
  ['runDomDemo', '演示 DOM 查询、内容修改、classList、dataset。'],
  ['runAsyncDemo', '演示 Promise、async/await、Promise.all。'],
  ['runStorageDemo', '演示 JSON.stringify、JSON.parse、localStorage。'],
  ['runErrorDemo', '演示 try/catch/finally 和 throw。'],
  ['runAllDemos', '按顺序运行所有复习示例。'],
  ['handleToolbarClick', '根据按钮的 data-demo 分发不同示例。'],
  ['handleLayerPreview', '读取表单值，生成并输出图层对象。'],
  ['bootstrap', '页面初始化入口，绑定事件并渲染索引。']
]

const output = document.querySelector('#output')
const topicList = document.querySelector('#topicList')
const functionList = document.querySelector('#functionList')
const liveBox = document.querySelector('#liveBox')
const liveText = document.querySelector('#liveText')
const statusLine = document.querySelector('#statusLine')
const layerNameInput = document.querySelector('#layerNameInput')
const layerTypeSelect = document.querySelector('#layerTypeSelect')
const previewLayerBtn = document.querySelector('#previewLayerBtn')
const toolbar = document.querySelector('.toolbar')

function renderList(container, items, itemClassName) {
  container.innerHTML = items
    .map(([title, description]) => {
      return `
        <div class="${itemClassName}">
          <strong>${title}</strong>
          <span>${description}</span>
        </div>
      `
    })
    .join('')
}

function log(title, value) {
  const text = `${title}\n${formatValue(value)}\n\n`

  if (output.textContent === '点击上方按钮开始复习。') {
    output.textContent = ''
  }

  output.textContent += text
  output.scrollTop = output.scrollHeight
  console.log(title, value)
}

function formatValue(value) {
  if (typeof value === 'string') {
    return value
  }

  return JSON.stringify(value, null, 2)
}

function clearOutput() {
  output.textContent = ''
}

function createLayer(name, type, visible = true) {
  return {
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    name,
    type,
    visible,
    createdAt: new Date().toLocaleString()
  }
}

function groupBy(array, key) {
  return array.reduce((result, item) => {
    const groupName = item[key]
    result[groupName] = result[groupName] || []
    result[groupName].push(item)
    return result
  }, {})
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function fakeFetchLayers() {
  await sleep(500)

  return [
    { id: 1, name: '行政区划', type: 'vector', visible: true },
    { id: 2, name: '遥感影像', type: 'raster', visible: true },
    { id: 3, name: '地形高程', type: 'terrain', visible: false }
  ]
}

function runVariablesDemo() {
  const cityName = '杭州'
  let population = 1237.6
  const isCapital = false
  const emptyValue = null
  let notAssigned
  const layerConfig = { name: '城市道路', type: 'vector' }
  const coordinates = [120.1551, 30.2741]

  population = Number(population.toFixed(1))

  log('变量与数据类型', {
    cityName,
    population,
    isCapital,
    emptyValue,
    notAssigned,
    layerConfig,
    coordinates,
    typeOfCityName: typeof cityName,
    typeOfPopulation: typeof population,
    isArray: Array.isArray(coordinates),
    stringToNumber: Number('123'),
    booleanResult: Boolean('有内容')
  })
}

function runFunctionDemo() {
  function formatCity(name = '未知城市', level = '普通城市') {
    return `${name}：${level}`
  }

  const add = (a, b) => a + b

  function createCounter(start = 0) {
    let count = start

    return function increase() {
      count += 1
      return count
    }
  }

  const counter = createCounter(10)

  const mapTool = {
    name: '测距工具',
    getName() {
      return this.name
    },
    getNameByArrow: () => {
      return '箭头函数没有自己的 this'
    }
  }

  log('函数、作用域、闭包、this', {
    normalFunction: formatCity('武汉', '省会城市'),
    arrowFunction: add(3, 7),
    closureFirst: counter(),
    closureSecond: counter(),
    objectMethodThis: mapTool.getName(),
    arrowThis: mapTool.getNameByArrow(),
    callDemo: mapTool.getName.call({ name: '图层编辑工具' }),
    bindDemo: mapTool.getName.bind({ name: '坐标拾取工具' })()
  })
}

function runObjectArrayDemo() {
  const layers = [
    { id: 1, name: '道路', type: 'vector', visible: true, featureCount: 120 },
    { id: 2, name: '建筑物', type: 'vector', visible: true, featureCount: 86 },
    { id: 3, name: '影像底图', type: 'raster', visible: true, featureCount: 0 },
    { id: 4, name: '地形', type: 'terrain', visible: false, featureCount: 0 }
  ]

  const visibleLayers = layers.filter((layer) => layer.visible)
  const layerNames = layers.map((layer) => layer.name)
  const totalFeatureCount = layers.reduce((sum, layer) => sum + layer.featureCount, 0)
  const firstVectorLayer = layers.find((layer) => layer.type === 'vector')
  const groupedLayers = groupBy(layers, 'type')

  log('对象与数组常用方法', {
    keys: Object.keys(layers[0]),
    values: Object.values(layers[0]),
    entries: Object.entries(layers[0]),
    spreadObject: { ...layers[0], visible: false },
    visibleLayers,
    layerNames,
    totalFeatureCount,
    firstVectorLayer,
    hasRasterLayer: layers.some((layer) => layer.type === 'raster'),
    allHaveName: layers.every((layer) => layer.name),
    groupedLayers
  })
}

function runToolDemo() {
  const serviceUrl = ' https://example.com/geoserver/wms '
  const center = [120.1551, 30.2741]
  const now = new Date()
  const scale = 12345.678
  const randomOpacity = Math.round(Math.random() * 100) / 100

  log('字符串、数字、日期、Math', {
    trimmedUrl: serviceUrl.trim(),
    includesGeoServer: serviceUrl.includes('geoserver'),
    urlParts: serviceUrl.trim().split('/'),
    coordinateText: center.join(', '),
    fixedScale: scale.toFixed(2),
    roundedScale: Math.round(scale),
    minCoordinate: Math.min(...center),
    maxCoordinate: Math.max(...center),
    randomOpacity,
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    timestamp: Date.now(),
    localTime: now.toLocaleString()
  })
}

function runDomDemo() {
  const moduleName = liveBox.dataset.module

  liveBox.classList.toggle('active')
  liveText.textContent = `已经通过 querySelector 找到元素，并用 textContent 修改内容。当前模块：${moduleName}。`
  statusLine.textContent = `classList.toggle 已执行，active 状态：${liveBox.classList.contains('active')}`

  log('DOM 查询、属性、样式类', {
    querySelector: '#liveBox',
    datasetModule: moduleName,
    textContent: liveText.textContent,
    hasActiveClass: liveBox.classList.contains('active')
  })
}

async function runAsyncDemo() {
  log('异步开始', '准备模拟接口请求，请等待 500ms。')

  const layers = await fakeFetchLayers()
  const [layerCountResult, visibleCountResult] = await Promise.all([
    Promise.resolve(layers.length),
    Promise.resolve(layers.filter((layer) => layer.visible).length)
  ])

  log('Promise 与 async/await', {
    layers,
    layerCountResult,
    visibleCountResult,
    note: '真实项目里这里通常会换成 fetch(url).then(res => res.json())'
  })
}

function runStorageDemo() {
  const currentLayer = createLayer(layerNameInput.value, layerTypeSelect.value)
  const jsonText = JSON.stringify(currentLayer)
  const parsedLayer = JSON.parse(jsonText)

  try {
    localStorage.setItem('js-review-layer', jsonText)

    log('JSON 与 localStorage', {
      jsonText,
      parsedLayer,
      savedValue: JSON.parse(localStorage.getItem('js-review-layer'))
    })
  } catch (error) {
    log('JSON 与 localStorage', {
      jsonText,
      parsedLayer,
      storageError: error.message
    })
  }
}

function runErrorDemo() {
  try {
    const zoom = Number('not-a-number')

    if (Number.isNaN(zoom)) {
      throw new Error('地图缩放级别必须是数字')
    }

    log('错误处理', { zoom })
  } catch (error) {
    log('捕获到错误', {
      message: error.message,
      type: error.name
    })
  } finally {
    statusLine.textContent = 'try/catch/finally 示例已执行。'
  }
}

async function runAllDemos() {
  clearOutput()
  runVariablesDemo()
  runFunctionDemo()
  runObjectArrayDemo()
  runToolDemo()
  runDomDemo()
  await runAsyncDemo()
  runStorageDemo()
  runErrorDemo()
}

async function handleToolbarClick(event) {
  const button = event.target.closest('button')

  if (!button) {
    return
  }

  if (button.dataset.action === 'clear') {
    clearOutput()
    return
  }

  const demoName = button.dataset.demo

  if (demoName !== 'all') {
    clearOutput()
  }

  if (demoName === 'all') await runAllDemos()
  if (demoName === 'variables') runVariablesDemo()
  if (demoName === 'functions') runFunctionDemo()
  if (demoName === 'objects') runObjectArrayDemo()
  if (demoName === 'tools') runToolDemo()
  if (demoName === 'dom') runDomDemo()
  if (demoName === 'async') await runAsyncDemo()
  if (demoName === 'storage') runStorageDemo()
  if (demoName === 'error') runErrorDemo()
}

function handleLayerPreview() {
  const layer = createLayer(layerNameInput.value, layerTypeSelect.value)

  statusLine.textContent = `已生成 ${layer.name}，类型：${layer.type}`
  log('表单事件生成的图层对象', layer)
}

function bootstrap() {
  renderList(topicList, topics, 'topic-item')
  renderList(functionList, functionIndex, 'function-item')

  toolbar.addEventListener('click', handleToolbarClick)
  previewLayerBtn.addEventListener('click', handleLayerPreview)

  log('初始化完成', '页面已经绑定事件。建议按按钮逐个复习，再打开 JS 文件看对应函数。')
}

bootstrap()
