import Map from "https://cdn.jsdelivr.net/npm/ol@10.9.0/Map.js";
import View from "https://cdn.jsdelivr.net/npm/ol@10.9.0/View.js";
import Feature from "https://cdn.jsdelivr.net/npm/ol@10.9.0/Feature.js";
import Overlay from "https://cdn.jsdelivr.net/npm/ol@10.9.0/Overlay.js";
import GeoJSON from "https://cdn.jsdelivr.net/npm/ol@10.9.0/format/GeoJSON.js";
import Point from "https://cdn.jsdelivr.net/npm/ol@10.9.0/geom/Point.js";
import TileLayer from "https://cdn.jsdelivr.net/npm/ol@10.9.0/layer/Tile.js";
import VectorLayer from "https://cdn.jsdelivr.net/npm/ol@10.9.0/layer/Vector.js";
import OSM from "https://cdn.jsdelivr.net/npm/ol@10.9.0/source/OSM.js";
import VectorSource from "https://cdn.jsdelivr.net/npm/ol@10.9.0/source/Vector.js";
import XYZ from "https://cdn.jsdelivr.net/npm/ol@10.9.0/source/XYZ.js";
import Draw from "https://cdn.jsdelivr.net/npm/ol@10.9.0/interaction/Draw.js";
import Modify from "https://cdn.jsdelivr.net/npm/ol@10.9.0/interaction/Modify.js";
import Select from "https://cdn.jsdelivr.net/npm/ol@10.9.0/interaction/Select.js";
import Snap from "https://cdn.jsdelivr.net/npm/ol@10.9.0/interaction/Snap.js";
import { defaults as defaultControls } from "https://cdn.jsdelivr.net/npm/ol@10.9.0/control/defaults.js";
import FullScreen from "https://cdn.jsdelivr.net/npm/ol@10.9.0/control/FullScreen.js";
import ScaleLine from "https://cdn.jsdelivr.net/npm/ol@10.9.0/control/ScaleLine.js";
import { getArea, getLength } from "https://cdn.jsdelivr.net/npm/ol@10.9.0/sphere.js";
import { fromLonLat, toLonLat } from "https://cdn.jsdelivr.net/npm/ol@10.9.0/proj.js";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "https://cdn.jsdelivr.net/npm/ol@10.9.0/style.js";

// GeoJSON 通常用 EPSG:4326 经纬度表达。OpenLayers 默认视图是 EPSG:3857，
// 所以下面 readFeatures 时会统一转换到地图投影。
const sampleGeojson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "beijing",
        name: "北京",
        category: "城市点",
        description: "示例点要素：适合理解 Point、属性字段和弹窗。"
      },
      geometry: {
        type: "Point",
        coordinates: [116.4074, 39.9042]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "shanghai",
        name: "上海",
        category: "城市点",
        description: "点击左侧列表或地图点位，可以定位并打开 Overlay。"
      },
      geometry: {
        type: "Point",
        coordinates: [121.4737, 31.2304]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "guangzhou",
        name: "广州",
        category: "城市点",
        description: "这些点来自内置 GeoJSON，便于离线阅读源码。"
      },
      geometry: {
        type: "Point",
        coordinates: [113.2644, 23.1291]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "study-route",
        name: "学习路线",
        category: "线要素",
        description: "示例线要素：可以观察 LineString 的样式和长度计算。"
      },
      geometry: {
        type: "LineString",
        coordinates: [
          [116.4074, 39.9042],
          [121.4737, 31.2304],
          [113.2644, 23.1291]
        ]
      }
    },
    {
      type: "Feature",
      properties: {
        id: "demo-area",
        name: "示例研究区",
        category: "面要素",
        description: "示例面要素：适合理解 Polygon、填充色和面积计算。"
      },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [104, 28],
            [119, 28],
            [119, 38],
            [104, 38],
            [104, 28]
          ]
        ]
      }
    }
  ]
};

const chinaCenter = fromLonLat([104.1954, 35.8617]);
const geojsonFormat = new GeoJSON();

const amapLayer = new TileLayer({
  source: new XYZ({
    url: "https://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
  }),
  properties: {
    title: "高德道路底图"
  }
});

const osmLayer = new TileLayer({
  source: new OSM({
    crossOrigin: "anonymous"
  }),
  visible: false,
  properties: {
    title: "OpenStreetMap 底图"
  }
});

const sampleSource = new VectorSource({
  features: geojsonFormat.readFeatures(sampleGeojson, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857"
  })
});

// 这一个 Feature 展示了如何用代码创建要素，而不是从 GeoJSON 读取。
const codedPoint = new Feature({
  geometry: new Point(fromLonLat([114.3055, 30.5928])),
  id: "wuhan",
  name: "武汉",
  category: "代码创建点",
  description: "这个点通过 new Feature 和 new Point 创建，可对比 GeoJSON 写法。"
});

sampleSource.addFeature(codedPoint);

const drawingSource = new VectorSource();

const sampleLayer = new VectorLayer({
  source: sampleSource,
  style: getSampleStyle,
  properties: {
    title: "示例矢量图层"
  }
});

const drawingLayer = new VectorLayer({
  source: drawingSource,
  style: new Style({
    fill: new Fill({
      color: "rgba(239, 68, 68, 0.18)"
    }),
    stroke: new Stroke({
      color: "#ef4444",
      width: 3,
      lineDash: [8, 8]
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({
        color: "#ef4444"
      }),
      stroke: new Stroke({
        color: "#ffffff",
        width: 2
      })
    })
  }),
  properties: {
    title: "用户绘制图层"
  }
});

const popupElement = document.querySelector("#popup");
const popupContent = document.querySelector("#popup-content");
const popupCloser = document.querySelector("#popup-closer");

const popupOverlay = new Overlay({
  element: popupElement,
  autoPan: {
    animation: {
      duration: 250
    }
  },
  offset: [0, -12]
});

const map = new Map({
  target: "map",
  layers: [amapLayer, osmLayer, sampleLayer, drawingLayer],
  overlays: [popupOverlay],
  controls: defaultControls().extend([
    new ScaleLine({
      units: "metric"
    }),
    new FullScreen()
  ]),
  view: new View({
    center: chinaCenter,
    zoom: 4,
    minZoom: 2,
    maxZoom: 18
  })
});

const modifyInteraction = new Modify({
  source: drawingSource
});

const selectInteraction = new Select({
  layers: [sampleLayer, drawingLayer],
  style: getSelectedStyle
});

const snapInteraction = new Snap({
  source: drawingSource
});

map.addInteraction(modifyInteraction);
map.addInteraction(selectInteraction);
map.addInteraction(snapInteraction);

let drawInteraction = null;

const drawTypeSelect = document.querySelector("#draw-type");
const measureOutput = document.querySelector("#measure-output");
const pointerCoordinate = document.querySelector("#pointer-coordinate");
const zoomLevel = document.querySelector("#zoom-level");
const featureList = document.querySelector("#feature-list");
const baseMapSelect = document.querySelector("#base-map-select");
const toggleBaseMap = document.querySelector("#toggle-base-map");
const baseMapStatus = document.querySelector("#base-map-status");

document.querySelector("#zoom-to-china").addEventListener("click", () => {
  map.getView().animate({
    center: chinaCenter,
    zoom: 4,
    duration: 500
  });
});

document.querySelector("#fit-features").addEventListener("click", fitToSampleFeatures);

document.querySelector("#clear-drawings").addEventListener("click", () => {
  drawingSource.clear();
  measureOutput.textContent = "已清空绘制图层。";
  popupOverlay.setPosition(undefined);
  popupElement.classList.remove("is-visible");
});

baseMapSelect.addEventListener("change", updateBaseMap);

toggleBaseMap.addEventListener("change", updateBaseMap);

amapLayer.getSource().on("tileloaderror", () => {
  baseMapStatus.textContent = "高德底图瓦片加载失败，可以切换到 OpenStreetMap 试试。";
});

osmLayer.getSource().on("tileloaderror", () => {
  baseMapStatus.textContent = "OpenStreetMap 瓦片加载失败，国内网络下建议使用高德道路底图。";
});

document.querySelector("#toggle-samples").addEventListener("change", (event) => {
  sampleLayer.setVisible(event.target.checked);
});

document.querySelector("#base-map-opacity").addEventListener("input", (event) => {
  const opacity = Number(event.target.value);
  amapLayer.setOpacity(opacity);
  osmLayer.setOpacity(opacity);
});

drawTypeSelect.addEventListener("change", () => {
  setDrawInteraction(drawTypeSelect.value);
});

featureList.addEventListener("click", handleFeatureListClick);

popupCloser.addEventListener("click", () => {
  popupOverlay.setPosition(undefined);
  popupElement.classList.remove("is-visible");
  popupCloser.blur();
});

map.on("singleclick", (event) => {
  const feature = map.forEachFeatureAtPixel(event.pixel, (hitFeature) => hitFeature);

  if (!feature) {
    popupOverlay.setPosition(undefined);
    popupElement.classList.remove("is-visible");
    return;
  }

  showFeaturePopup(feature, event.coordinate);
});

map.on("pointermove", (event) => {
  if (event.dragging) {
    return;
  }

  const lonLat = toLonLat(event.coordinate);
  pointerCoordinate.textContent = `经纬度：${lonLat[0].toFixed(4)}, ${lonLat[1].toFixed(4)}`;
});

map.getView().on("change:resolution", updateZoomInfo);

renderFeatureList();
updateZoomInfo();
updateBaseMap();

function updateBaseMap() {
  const selectedBaseMap = baseMapSelect.value;
  const shouldShowBaseMap = toggleBaseMap.checked && selectedBaseMap !== "none";

  amapLayer.setVisible(shouldShowBaseMap && selectedBaseMap === "amap");
  osmLayer.setVisible(shouldShowBaseMap && selectedBaseMap === "osm");

  const statusText = {
    amap: "当前底图：高德道路底图。",
    osm: "当前底图：OpenStreetMap。若空白，多半是瓦片网络访问失败。",
    none: "当前底图：已关闭，只显示矢量图层。"
  };

  baseMapStatus.textContent = shouldShowBaseMap ? statusText[selectedBaseMap] : "当前底图：已关闭，只显示矢量图层。";
}

function setDrawInteraction(type) {
  if (drawInteraction) {
    map.removeInteraction(drawInteraction);
    drawInteraction = null;
  }

  if (type === "None") {
    measureOutput.textContent = "选择线或面后开始绘制，可查看长度或面积。";
    return;
  }

  drawInteraction = new Draw({
    source: drawingSource,
    type
  });

  drawInteraction.on("drawstart", () => {
    measureOutput.textContent = "正在绘制，双击结束线或面。";
  });

  drawInteraction.on("drawend", (event) => {
    const feature = event.feature;
    const geometry = feature.getGeometry();

    feature.setProperties({
      name: "用户绘制要素",
      category: getGeometryLabel(geometry),
      description: "这是你在地图上绘制出来的新要素，可拖动顶点继续编辑。"
    });

    measureOutput.textContent = formatGeometryMeasure(geometry);
  });

  map.addInteraction(drawInteraction);
}

function renderFeatureList() {
  const pointFeatures = sampleSource
    .getFeatures()
    .filter((feature) => feature.getGeometry().getType() === "Point");

  featureList.innerHTML = pointFeatures
    .map((feature) => {
      const id = feature.get("id");
      const name = feature.get("name");
      const category = feature.get("category");
      return `
        <li>
          <button type="button" data-feature-id="${id}">
            <span class="feature-name">${name}</span>
            <span class="feature-meta">${category} · 点击定位</span>
          </button>
        </li>
      `;
    })
    .join("");
}

function handleFeatureListClick(event) {
  const button = event.target.closest("[data-feature-id]");

  if (!button) {
    return;
  }

  const feature = sampleSource.getFeatures().find((item) => item.get("id") === button.dataset.featureId);

  if (!feature) {
    return;
  }

  const coordinate = feature.getGeometry().getCoordinates();

  map.getView().animate({
    center: coordinate,
    zoom: 8,
    duration: 500
  });

  showFeaturePopup(feature, coordinate);
}

function fitToSampleFeatures() {
  map.getView().fit(sampleSource.getExtent(), {
    padding: [80, 80, 80, 80],
    duration: 600,
    maxZoom: 8
  });
}

function showFeaturePopup(feature, coordinate) {
  const geometry = feature.getGeometry();
  const lonLat = toLonLat(getPopupCoordinate(geometry, coordinate));
  const measure = formatGeometryMeasure(geometry);

  popupContent.innerHTML = `
    <h3>${feature.get("name") || "未命名要素"}</h3>
    <p><strong>类型：</strong>${feature.get("category") || getGeometryLabel(geometry)}</p>
    <p>${feature.get("description") || "暂无描述。"}</p>
    <p><strong>位置：</strong>${lonLat[0].toFixed(4)}, ${lonLat[1].toFixed(4)}</p>
    <p><strong>量算：</strong>${measure}</p>
  `;

  popupOverlay.setPosition(getPopupCoordinate(geometry, coordinate));
  popupElement.classList.add("is-visible");
}

function getPopupCoordinate(geometry, fallbackCoordinate) {
  const type = geometry.getType();

  if (type === "Point") {
    return geometry.getCoordinates();
  }

  if (type === "Polygon") {
    return geometry.getInteriorPoint().getCoordinates();
  }

  return fallbackCoordinate;
}

function updateZoomInfo() {
  zoomLevel.textContent = `缩放级别：${map.getView().getZoom().toFixed(2)}`;
}

function formatGeometryMeasure(geometry) {
  const type = geometry.getType();

  if (type === "LineString") {
    return `长度约 ${formatLength(getLength(geometry))}`;
  }

  if (type === "Polygon") {
    return `面积约 ${formatArea(getArea(geometry))}`;
  }

  if (type === "Point") {
    return "点要素没有长度或面积。";
  }

  return "暂不支持该几何类型的量算。";
}

function formatLength(lengthInMeters) {
  if (lengthInMeters >= 1000) {
    return `${(lengthInMeters / 1000).toFixed(2)} km`;
  }

  return `${lengthInMeters.toFixed(0)} m`;
}

function formatArea(areaInSquareMeters) {
  if (areaInSquareMeters >= 1000000) {
    return `${(areaInSquareMeters / 1000000).toFixed(2)} km²`;
  }

  return `${areaInSquareMeters.toFixed(0)} m²`;
}

function getGeometryLabel(geometry) {
  const labels = {
    Point: "点要素",
    LineString: "线要素",
    Polygon: "面要素"
  };

  return labels[geometry.getType()] || geometry.getType();
}

function getSampleStyle(feature) {
  const geometryType = feature.getGeometry().getType();
  const name = feature.get("name") || "";

  if (geometryType === "Point") {
    return new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({
          color: "#177e89"
        }),
        stroke: new Stroke({
          color: "#ffffff",
          width: 2
        })
      }),
      text: new Text({
        text: name,
        offsetY: -18,
        fill: new Fill({
          color: "#102a43"
        }),
        stroke: new Stroke({
          color: "#ffffff",
          width: 4
        }),
        font: "600 13px Microsoft YaHei, sans-serif"
      })
    });
  }

  if (geometryType === "LineString") {
    return new Style({
      stroke: new Stroke({
        color: "#2563eb",
        width: 4
      })
    });
  }

  if (geometryType === "Polygon") {
    return new Style({
      fill: new Fill({
        color: "rgba(23, 126, 137, 0.16)"
      }),
      stroke: new Stroke({
        color: "#177e89",
        width: 2
      })
    });
  }

  return null;
}

function getSelectedStyle(feature) {
  const geometry = feature.getGeometry();
  const geometryType = geometry.getType();

  if (geometryType === "Point") {
    return new Style({
      image: new CircleStyle({
        radius: 10,
        fill: new Fill({
          color: "#f97316"
        }),
        stroke: new Stroke({
          color: "#ffffff",
          width: 3
        })
      }),
      text: new Text({
        text: feature.get("name") || "",
        offsetY: -22,
        fill: new Fill({
          color: "#7c2d12"
        }),
        stroke: new Stroke({
          color: "#ffffff",
          width: 4
        }),
        font: "700 13px Microsoft YaHei, sans-serif"
      })
    });
  }

  return new Style({
    fill: new Fill({
      color: "rgba(249, 115, 22, 0.2)"
    }),
    stroke: new Stroke({
      color: "#f97316",
      width: 4
    })
  });
}
