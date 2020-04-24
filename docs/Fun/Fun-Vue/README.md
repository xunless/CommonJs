<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 10:17:59
 * @LastEditors: champoin
 * @LastEditTime: 2020-04-22 16:58:16
 -->
<!-- ## Vue的方法 -->


## 微信公众号获取用户信息

### TypeScript 方法

1. [getQueryString](#正则解析-url-获取公众号-code) 获取公众号 code 方法

```typescript
/*
  @param { function } callback - 获取到openid后可执行的函数(可穿可不穿)
*/
async function GetOpenId(callback?: Function) {
  var redirecturl = encodeURIComponent(window.location.href)
  code = getQueryString('code')
  if (!code && !openid) {
    window.location.href =
      'http://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
      wxappid +
      '&redirect_uri=' +
      redirecturl +
      '&response_type=code&scope=snsapi_base&state=0#wechat_redirect'
  } else if (code && !openid) {
    const openid: RootStateTypes = await GetQryWebToken()
    await GetUserinfo(openid.openid)
    if (callback) callback()
  } else {
    if (callback) callback()
  }
}
```

## 正则解析 URL 获取公众号 code

```typescript
/*
  @param { string } name - 获取到微信回调的url链接
*/

function getQueryString(name: string) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
```

## 微信 JSSDK 授权

微信 jssdk 权限列表[查看全部](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)

```typescript
/**
 * desc 获取微信JSSDK签名
 * author wxw
 * time 2019年10月25日 11:40:39 星期五
 */
let appId: string = ''
let timestamp: number | null = null
let signature: string = ''
let nonceStr: string = ''
async function GetSignature(callback?: Function) {
  try {
    const res: WXauthorizeType = await GetWxSig()
    appId = res.appId
    timestamp = res.timestamp
    signature = res.signature
    nonceStr = res.nonceStr
  } catch (error) {
    console.log(error)
  }
  wx.config({
    beta: true,
    debug: false,
    appId, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: ['scanQRCode', 'translateVoice', 'chooseWXPay']
  })
  wx.ready(() => {
    wx.showAllNonBaseMenuItem()
    if (callback) {
      callback()
    }
  })
}
```

## vue-element-admin后台 点击侧边栏 刷新当前路由

```javascript
/**
 * 解决方法：
 * 点击侧边栏菜单时，先跳转到Redirect 页面，在Redirect页面再将路由重定向到想去的页面，这样就起到了刷新的效果了。
 * Redirect页面和路由配置admin后台自带的有，只需修改 @/views/layout/components/Sidebar/Link.vue 文件 中的 linkProps 方法
 * 弊端：
 * 第一次点击菜单时也会触发重定向
 * */
linkProps(url) {
  if (this.isExternalLink(url)) {
    return {
      is: 'a',
      href: url,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    is: 'router-link',
    to: 'redirect' + url  // 在url前加上'redirect'即可
  }
}
```

## Vue中使用百度地图,高德地图,腾讯地图

git地址:

````
http://39.99.37.143:3000/ZhangMengLin/MapForVue
````

