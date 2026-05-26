# OpenLayers 二维 WebGIS 入门案例

这是一个面向源码学习的静态 WebGIS 小案例。它不用构建工具，也不用安装 npm 依赖；OpenLayers 通过 CDN 引入，版本固定为 `10.9.0`。

## 文件说明

- `index.html`：页面结构，包含侧边栏、地图容器、状态栏和弹窗容器。
- `styles.css`：页面布局和控件样式，重点看 `.app-shell`、`.sidebar`、`.map-stage`、`.popup`。
- `main.js`：OpenLayers 核心逻辑，重点学习 Map、View、Layer、Source、Feature、Interaction、Overlay。
- `dev-server.js`：一个很小的本地静态服务，用来稳定运行 ES Module 示例。

## 建议阅读顺序

1. 先看 `index.html` 里的 `<div id="map">`，它是 OpenLayers 挂载地图的容器。
2. 再看 `main.js` 顶部的 `import`，理解每个模块对应的地图能力。
3. 阅读 `sampleGeojson`，观察 GeoJSON 如何表达点、线、面。
4. 阅读 `amapLayer`、`osmLayer`、`sampleLayer`、`drawingLayer`，理解图层和数据源的关系。
5. 阅读 `new Map({ ... })`，理解地图由 target、layers、view、controls、overlays 组成。
6. 阅读 `setDrawInteraction`、`showFeaturePopup`、`fitToSampleFeatures`，学习交互、弹窗和视图定位。

## 这个案例覆盖的 WebGIS 概念

- 底图图层：`TileLayer + XYZ`、`TileLayer + OSM`
- 矢量图层：`VectorLayer + VectorSource`
- 矢量数据：内置 GeoJSON 和代码创建的 `Feature`
- 坐标转换：`fromLonLat`、`toLonLat`
- 地图视图：中心点、缩放级别、动画定位、范围适配
- 地图交互：点击识别、绘制、编辑、吸附、选择高亮
- 地图弹窗：`Overlay`
- 简单量算：线长度、面面积
- 图层控制：显隐和透明度

## 底图不显示怎么办

如果你看到点、线、面和控件，但地图底图是空白，通常是外部瓦片服务访问失败，不是 OpenLayers 地图初始化失败。本案例默认使用高德道路底图，并保留 OpenStreetMap 选项，方便对比两种常见底图写法：

- `amapLayer`：`TileLayer + XYZ`，更适合国内网络环境下学习。
- `osmLayer`：`TileLayer + OSM`，OpenLayers 官方入门示例常用写法。

如果两个在线底图都加载失败，依然可以先学习矢量图层、绘制、弹窗和量算逻辑；这些功能不依赖底图瓦片。

## 运行方式

推荐使用 Node 启动本地服务：

```powershell
node dev-server.js
```

然后访问：

```text
http://127.0.0.1:8080
```

如果你想换端口，可以这样启动：

```powershell
$env:PORT=5173; node dev-server.js
```

有些浏览器也能直接双击打开 `index.html`，但本案例使用了 `type="module"`，本地 HTTP 服务更稳定。

```text
index.html
```

## 官方资料

- OpenLayers Quick Start: <https://openlayers.org/doc/quickstart.html>
- OpenLayers API: <https://openlayers.org/en/latest/apidoc/>
