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

