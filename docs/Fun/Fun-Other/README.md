<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 10:17:59
 * @LastEditors  : 王
 * @LastEditTime : 2019-12-23 10:30:44
 -->
## 手机号正则验证

1. 本 demo 为 TS 使用,JS 使用将参数 `num:string` 删除。
2. 参数为单个参数,返回 true/false
3. 手机号段具有不稳定性，使用前请效验准确性。

```javascript
function RegPhone(num: string) {
  const Rge = new RegExp(/^(13[0-9]|15[^4]|18[0-9]|17[0-8]|147)\d{8,8}$/)
  return Rge.test(num)
}
```
## 将 base64 转换为文件

```javascript
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, {
    type: mime
  })
}
```

## 原图转回 base64

```javascript
/*
   @return base64
*/
function img2file(src, can_w, can_h, callback) {
  var _caipu_img = new Image()

  _caipu_img.src = src

  _caipu_img.onload = function() {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = can_w
    canvas.height = can_h
    var w = _caipu_img.width
    var h = _caipu_img.height

    ctx.drawImage(_caipu_img, 0, 0, w, h)

    //异步操作 不回调可能会取到undefined

    if (callback && typeof callback == 'function') {
      return callback(canvas.toDataURL('image/png', 1))
    }
  }
}
```


## 时间转换

```javascript
/**
 * 时间转换
 * @param {Number} time 时间
 * @param {String} cFormat 时间格式 默认 {y}/{m}/{d} {h}:{i}:{s}
 * @return {Sting} time_str 转换后的时间字符串
 * */
function parseTime(time,cFormat){
	if (arguments.length === 0) {
	  return null
	}
	const format = cFormat || '{y}/{m}/{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
	  date = time
	} else {
	  if (('' + time).length === 10) time = parseInt(time) * 1000
	  date = new Date(time)
	}
	const formatObj = {
	  y: date.getFullYear(),
	  m: date.getMonth() + 1,
	  d: date.getDate(),
	  h: date.getHours(),
	  i: date.getMinutes(),
	  s: date.getSeconds(),
	  a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
	  let value = formatObj[key]
	  // Note: getDay() returns 0 on Sunday
	  if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
	  if (result.length > 0 && value < 10) {
	    value = '0' + value
	  }
	  return value || 0
	})
	return time_str
}
```


## 判断是否为IE浏览器

```javascript
/**
  * desc 判断是否为IE浏览器  IE11及以下
  * author
  * time 2019年12月17日 12:04:15 星期二
  */
export function isIE() {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    return true
  } else {
    return false
  }
}
```

## 随机颜色

```javascript
/**
 * desc 随机颜色
 * author
 * time 2019年12月19日 18:56:06 星期四
 */
export function rgb() { // rgb颜色随机
  var r = Math.floor(Math.random() * 256)
  var g = Math.floor(Math.random() * 256)
  var b = Math.floor(Math.random() * 256)
  var rgb = '(' + r + ',' + g + ',' + b + ')'
  return 'rgb' + rgb
}
```

## 简单深拷贝

```javascript
/**
 * desc 简单深拷贝
 * author 
 * time 2019年12月21日 10:06:38 星期六
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'deepClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

```