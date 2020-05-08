<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 10:17:59
 * @LastEditors: 刘
 * @LastEditTime: 2020-04-21 11:39:00
 -->

## 手机号正则验证

1. 本 demo 为 TS 使用,JS 使用将参数 `num:string` 删除。
2. 参数为单个参数,返回 true/false
3. 手机号段具有不稳定性，使用前请效验准确性。

```javascript
function RegPhone (num: string) {
  const Rge = new RegExp(/^(13[0-9]|15[^4]|18[0-9]|17[0-8]|147)\d{8,8}$/)
  return Rge.test(num)
}
```

## 将 base64 转换为文件

```javascript
function dataURLtoFile (dataurl, filename) {
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
function img2file (src, can_w, can_h, callback) {
  var _caipu_img = new Image()

  _caipu_img.src = src

  _caipu_img.onload = function () {
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
function parseTime (time, cFormat) {
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
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
```

## 判断是否为 IE 浏览器

```javascript
/**
 * desc 判断是否为IE浏览器  IE11及以下
 * author
 * time 2019年12月17日 12:04:15 星期二
 */
export function isIE () {
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
export function rgb () {
  // rgb颜色随机
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
export function deepClone (source) {
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

## 常用正则校验

```javascript
/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
    s
  )
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/**
 * 8-16位数字和字母密码
 * @param {*} s
 */
export function isPassWord (s) {
  return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(s)
}

/**
 * QQ号
 * @param {*} s
 */
export function isQQ (s) {
  return /[1-9][0-9]{4,}/.test(s)
}

/**
 * IP地址
 * @param {*} s
 */
export function isIP (s) {
  return /\d+\.\d+\.\d+\.\d+/.test(s)
}

/**
 * 中文
 * @param {*} s
 */
export function isZH (s) {
  return /^[\u4e00-\u9fa5]*$/.test(s)
}
```

## 计算倒计时

```javascript
/**
 * 倒计时
 * @param {Number} timeStamp 倒计时结束的时间戳 毫秒 13位
 */
export function seckillTime (timeStamp) {
  timeStamp = timeStamp - new Date().getTime()
  let day = Math.floor(timeStamp / (24 * 3600 * 1000))
  let leave1 = timeStamp % (24 * 3600 * 1000)
  let hours = Math.floor(leave1 / (3600 * 1000))
  let leave2 = leave1 % (3600 * 1000)
  let minutes = Math.floor(leave2 / (60 * 1000))
  let leave3 = leave2 % (60 * 1000)
  let seconds = Math.floor(leave3 / 1000)
  if (day) return day + '天' + hours + '小时' + minutes + '分'
  if (hours) return hours + '小时' + minutes + '分' + seconds + '秒'
  if (minutes) return minutes + '分' + seconds + '秒'
  if (seconds) return seconds + '秒'
  return '时间到！'
}
```

## 将字符串转换为 n 个字符串一起的数组

例子:

```javascript
将 123456 转换为 [12, 34, 56]

let str = 123456
strToArr2(str,2) // [12, 34, 56]
```

方法:

```javascript
/*
 * 将字符串转换为数组
 * s: 要转换的字符串
 * n: 要转换为几个一起的字符串(数组的长度-1)
 */
export function strToArr2 (s, n) {
  var re = new RegExp('.{' + n + '}', 'g')
  var a = []
  var n
  while ((n = re.exec(s)) != null) {
    a[a.length] = n[0]
  }
  return a
}
```

## 防抖和节流

函数防抖（debounce）：当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时（执行最后一次事件）。
（debounce1）：（执行第一次事件）。

函数节流（throttle）：当持续触发事件时，保证一定时间段内只调用一次事件处理函数。

方法：

```javascript
/**
 * @desc 函数防抖 执行最后一次事件
 * @param fn 函数
 * @param delay 延迟执行毫秒数 默认0.5s
 */
export function debounce (fn, delay) {
  var delay = delay || 500
  var timer
  return function () {
    console.log('调用了debounce方法')
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}

/**
 * @desc 函数防抖 执行第一次事件
 * @param fn 函数
 * @param delay 延迟执行毫秒数 默认0.5s
 */
export function debounce1 (fn, delay) {
  var delay = delay || 500
  var timer
  return function () {
    console.log('调用了debounce方法')
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    } else {
      fn.apply(this, args)
    }
    timer = setTimeout(() => {
      timer = null
    }, delay)
  }
}

/**
 * @desc 函数节流
 * @param fn 函数
 * @param interval 函数执行间隔时间毫秒数 默认1s
 */
export function throttle (fn, interval) {
  var last
  var timer
  var interval = interval || 1000
  return function () {
    console.log('调用了throttle方法')
    var th = this
    var args = arguments
    var now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(function () {
        last = now
        fn.apply(th, args)
      }, interval)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
```

示例：

```html
<template>
  <view>
    <text @tap="clickDebounce()">防抖</text>
    <text @tap="clickThrottle()">节流</text>
  </view>
</template>

<script>
  import { debounce, throttle } from '@/utils/index.js'
  export default {
    data () {
      return {
        num: 0
      }
    },
    methods: {
      // 防抖
      clickDebounce: debounce(function () {
        this.num += 1
        console.log('第' + this.num + '次点击')
      }, 600),
      // 节流
      clickThrottle: throttle(function () {
        this.num += 1
        console.log('第' + this.num + '次点击')
      }, 800)
    }
  }
</script>
```

## 常用正则总结

https://github.com/xunless/CommonJs/blob/master/docs/Fun/Fun-Other/js/validate.js

## 全局过滤时间戳转换时间日期（java 接口时间返回全为时间戳）

java 后台数据返回的所有相关时间均为时间戳格式 需前端进行装换处理 在 mian.js 中引用 在页面中使用(time | dateFormat)

```javascript
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
```

## js 中~~和^=分别代表什么，用处是什么?

先看个栗子：

```javascript
~~false === 0
~~true === 1
~~undefined === 0
~~!undefined === 1
~~null === 0
~~!null === 1
~~'' === 0
~~!'' === 1
```

~是按位取反的意思，计算机里面处理二进制数据时候的非，~~就是再转回来，利用两个按位取反的符号，进行类型的转换，转换成数字符号。

而在计算机里面的^=是异或运算，相同取 0，不同取 1.

两个整数交换可以酱紫表示：

```
var` `a = 10,b=20;``a ^= b; b^=a;a^=b;　　　
```

将 a = a ^= b; b = b^=a; a = a^=b;在 js 中类似于：

```
var` `a = 1,b = 2;``a = a + b;``b = a - b;``a = a - b;``a ``// 2``b ``//1
```

不过这种方法适用于任意两个数字类型的交换，无论是整数类型还是小数。

其次，交换两个变量，最简单的方式是：

```
var` `a = 2,b = ``'Miya'``;``[a,b,] = [b,a,]``a ``// Miya``b ``//2
```

这个是 ES6 中的数组的解构赋值，很方便的进行两个变量的交换。

## 常用 canvas 总结

```javascript
canvas = document.getElementById('canvas')
// 设置canvas的宽高
canvas.height = 500
canvas.width = 500

// 二维绘图API
ctx = canvas.getContext('2d')

// 画一个半径为10，边框蓝色，背景红色的圆
ctx.beginPath() // 开始一条路径
ctx.arc(60, 60, 50, 0, Math.PI * 2, true) // arc(圆心x坐标，y坐标，半径，起始角，结束角，true顺时针false逆时针默认false)
ctx.strokeStyle = '#4b8beb' // 线条(边框)颜色
ctx.stroke() // 绘制线条颜色
ctx.fillStyle = '#eb0707' // 填充颜色
ctx.fill() // 填充背景

// 三角形
ctx.beginPath()
ctx.strokeStyle = '#BBFFFF'
ctx.moveTo(50, 150) // 开始点
ctx.lineTo(100, 150) // 连接上一个点
ctx.lineTo(75, 100) // 此时有两条线
ctx.closePath() // 创建从当前所在点到开始点的路径
ctx.stroke()

// 图片
const img = new Image()
img.src = 'http://pic.cnblogs.com/avatar/1809452/20191027130609.png'
img.onload = function () {
  // 绘制图片
  ctx.beginPath()
  ctx.drawImage(img, 50, 50, 75, 75) // drawImage(img, x坐标，y坐标，宽，高)
  ctx.closePath()
}

// 文字
ctx.font = '12px Arial' // 文字的样式
ctx.textAlign = 'center' // 坐标点相对于文字的文字  取值：left、center、right
ctx.fillStyle = '#eb0707' // 颜色
ctx.fillText('这是canvas上的文字', 120, 200) // fillText(文本内容, x坐标，y坐标)
```

## Tinymce 配置打包之后上传图片没有连接解决

在项目目录`components/Tinymce/index.vue`中添加配置如下  
`convert_urls: false,` // 关闭此选项，TinyMCE 将不会自动处理 URL，也就是说，插入的 URL 原本是什么就是什么，不会自动转换相对或绝对路径，这样会导致内容 URL 极其混乱。所以，默认此选项是开启的。

## JS 图片压缩（不可用于 UNI-APP)

```javascript
let filetab = document.getElementById('filedemo')
filetab.onchange = function (e) {
  let file = e.target.files[0] // 获取到的图片信息
  let file_type = file.type // 图片的类型
  let file_name = file.name // 图片的名字
  let file_size = file.size // 图片的大小
}
```

获取到的信息包含大小，类型....

> 文件的 size 是按照字节，1 字节就是 1byte 就是 1B，1KB = 1024B，1MB = 1024 \* 1024B

- 将获取的图片转为 base64，返回一个空或者转换后的 Base64

```javascript
/**
 * > 小恐龙
 * @param {file} 需要压缩的图片文件
 * @return 图片的Base64
 */
function ImageToBase64 (file) {
  return new Promise(resolve => {
    if (!file) resolve(null) // 没有文件时直接返回
    let fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = function (e) {
      // e 是 onLoad之后返回的参数信息，其中就有我们需要的Base64的信息
      let imgBase64Info = e.target.result
      resolve(imgBase64Info) // 返回获取到的Base64信息
    }
  })
}
```

- 通过拿到的 Base64 的信息，我们通过创建 canvas 画布，进行画图，设置压缩级别后转出为 Base64，之后返回新的 Base64 信息

```javascript
/**
 * > 小恐龙
 * @param {base64} 获取BASE64的返回值
 * @return 新的Base64
 */
function comperImage (base64, filetype, quality) {
  return new Promise(resolve => {
    if (!base64) resolve() // 没有给信息直接返回
    let image = new Image()
    image.src = base64
    image.onload = function (e) {
      let info = e.path[0]
      let sacle = info.width / info.height // 获取宽高比例
      let canvas = document.createElement('canvas') // 创建画布
      let ctx = canvas.getContext('2d')
      canvas.width = info.width // 设置画布宽高
      canvas.height = info.height
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height) // 将图片绘制在画板上
      let newBase64 = canvas.toDataURL(filetype, quality) // 将画板内容转为图片并设置压缩比例
      resolve(newBase64)
    }
  })
}
```

- 将新的 Base64 转为新的文件并且返回

```javascript
/*/**
 *  Base64转换为File
 * > 小恐龙
 * @param { string } 文件的url，此处为生成的新的Base64
 * @param { string } 要生成的文件名字
 * @return  File
 */
function dataURLtoFile (dataurl, filename) {
  return new Promise(resolve => {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    resolve(new File([u8arr], filename, { type: mime }))
  })
}
```

- 当做完以上步骤之后，我们就可以拿到新的文件进行后续的操作。
  放个案例

```javascript
/**
 *  压缩图片
 * > 小恐龙
 * @param { file } 需要压缩的文件
 * @return
 */
async function comImg (file, quality, filename = `new_${file.name}`) {
  // 将png格式文件转为JPEG输出，因为Png图片不能用这种方式进行压缩
  let filetype = file.type === 'image/png' ? 'image/jpeg' : file.type
  let base64 = await ImageToBase64(file) // 获取需要压缩图片的base64
  let newBase64 = await comperImage(base64, filetype, quality) // 获取压缩后的base64
  let newFile = await dataURLtoFile(newBase64, filename) // 生成新文件
  console.log(`压缩后文件大小${newFile.size}`)
  let resultImg = new Image() // 创建Image标签
  resultImg.src = URL.createObjectURL(newFile) // 创建img的src
  document.body.appendChild(resultImg) //添加至页面
}
```

## 验证某个字符串是否包含在数组中

````javascript
/**

 * @name: 验证某个字符串是否包含在数组中

 * @test: test font

 * @msg:

 * @param {Boolean} true 存在 false不存在

 * @return:

 */

export function isStrInArray (str, arr) {

 let n = arr.length

 for (let i = 0; i < n; i++) {

  if (arr[i] + '' === str) {

   return true

  }

 }

 return false

}

````

## 出生日期转换为年龄

`````javascript
import moment from 'moment'
`````



````javascript
 getAge (birthday) {
      const text = moment(birthday, 'YYYY-MM-DD').fromNow()
      let age = parseInt(text, 10)  // 注意：parseInt(string, radix);第二个参数不能省略，否则会报Lint错误
      if (isNaN(age)) {
        age = '未知'
      }
      return age
    },
````

