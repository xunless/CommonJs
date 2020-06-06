<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 11:47:00
 * @LastEditors: champoin
 * @LastEditTime: 2020-04-22 17:01:22
 -->
## element-ui 上传压缩并返回Blob对象
[组件下载地址](http://39.99.37.143:3000/HuangGuanJun/webPublic/src/master/js/uploadComOne.vue)

```javascript
// 方法
/**
 * 图片压缩
 * @param {HTMLElement} image 创建的图片元素
 * @param {File} file File对象
 * @param {number} quality 图片压缩质量 0-1
 * @returns {Blob} Blob对象
 */
export function compressUpload(image, file, quality) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const { width, height } = image
  canvas.width = width
  canvas.height = height
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(image, 0, 0, width, height)
  const compressData = canvas.toDataURL(file.type || 'image/jpg', quality || 0.7)
  const blobImg = dataURLtoBlob(compressData)
  console.log(blobImg)
  return blobImg
}
/**
 * base64转换为Blob对象
 * @param {string} dataurl
 * @returns Blob
 */
export function dataURLtoBlob(dataurl) {
  var arr = dataurl.split(',')
  var mime = arr[0].match(/:(.*?);/)[1]
  var bstr = atob(arr[1])
  var n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}
```

## Vue中使用百度地图,高德地图,腾讯地图

[组件下载地址](http://39.99.37.143:3000/ZhangMengLin/MapForVue)

## Vue中table深色组件

[组件下载地址](http://39.99.37.143:3000/ZhangMengLin/AdminUi)

![1](E:\CommonJs\docs\Module\Module-Vue\image\1.jpg)

## Vue中二维码生成 显示 下载

[组件下载地址](http://39.99.37.143:3000/ZhangMengLin/QrCodeDown)

## Echarts地图钻取

[组件下载地址](https://github.com/dongkelun/vue-echarts-map)

[预览地址](http://gh.dongkelun.com/vue-echarts-map/#/)

## 刻度尺进度条组件

[组件下载地址](http://39.99.37.143:3000/ZhangMengLin/MarkLine)

![1](E:\CommonJs\docs\Module\Module-Vue\image\2.png)

## Echarts地图封装

[组件下载地址](http://39.99.37.143:3000/ZhangMengLin/MapEcharts)

### 使用说明

> template中使用

````html
<div class="map">
	<chinaMap ref="map" :options="options" :width="width" :height="height" :code="code" :geoCoordMap="geoCoordMap"></chinaMap>
</div>
````

> script中

````javascript
<script>
import chinaMap from "./echarts/chinaMap";
export default {
  data() {
    return {
      width: '100%',
      height: '800px',
      options: {
        top: 0,
        map: 'china',
        // 是否运行缩放移动
        // 如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        roam: true,
        // 当前视角的中心点
        center: null,
        // 视角
        // aspectScale:0.75,
        // 当前视角的缩放比例。
        zoom: 1,
        // 滚轮缩放的极限控制
        // scaleLimit: {
        //   max:4,
        //   min:1
        // },
        // 选中地图 single单选  multiple多选
        selectedMode: 'multiple',
        // 地图上文字样式与显示
        label: {
          show: false,
          color: '#fff',
          emphasis: {
            show: true
          }
        },
        itemStyle: {
          // 地图线条颜色
          normal: {
            areaColor: 'rgba(12,82,124,.9)',
            borderColor: '#0A93C6',
            // 描边线条样式
            borderType: 'solid',
            // 描边宽度
            borderWidth: 1
            // 设置边框阴影
            //  shadowColor: 'rgba(0, 0, 0, 0.5)',
            //  shadowBlur: 10
          },
          // 鼠标经过时候的区域颜色
          emphasis: {
            areaColor: '#355AC3'
          }
        },
        // 地图中对特定的区域配置样式。
        regions: [
          // {
          //   name: "河南",
          //   itemStyle: {
          //     areaColor: "red",
          //     color: "red"
          //   }
          // },
          // {
          //   name: "焦作市",
          //   itemStyle: {
          //     areaColor: "red",
          //     color: "red"
          //   }
          // }
        ]
      },
      code: 100000,
      geoCoordMap: []
    };
  },
  components: {
    chinaMap
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      // geoCoordMap 数据一般是后台返回的 格式为下面的格式
      this.geoCoordMap = [{
          name: '河南',
          value: [113.52, 35.22, 1525]
        },
        {
          name: '河南2',
          value: [106.3586, 38.1775, 1525]
        }]
      // 重新渲染地图
      setTimeout(() => {
        this.$refs.map.mapChart("mapChart");
      }, 500);
    },
    /*  getMap方法说明
     *  @method 查询省份地图
     *  @param { Number } code 城市代码
     *  @param { Array } geoCoordMap 实际值 
     *  @param { mapMsg } 配置项 
     */
    getMap(code, geoCoordMap, mapMsg) {
      this.code = code;
      this.geoCoordMap = geoCoordMap;
      for (let key in mapMsg) {
        this.options[key] = mapMsg[key];
      }
      setTimeout(() => {
        this.$refs.map.mapChart("mapChart");
      }, 500);
    }
  }
};
</script>
````

> style样式

````css
.home {
  width: 100%;
  height: 100vh;
  background: #0d2158;
}
.btn {
  width: 100px;
  height: 80px;
  display: inline-block;
  margin-right: 20px;
  line-height: 80px;
  cursor: pointer;
  text-align: center;
  color: #fff;
}
.map {
  width: 100%;
  /* height: 500px; */
}
````







