<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 10:17:59
 * @LastEditors: 王
 * @LastEditTime: 2020-04-25 18:37:27
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

## Vue中form表单常用rules校验规则

```javascript
/**
 * 是否合法IP地址
 */
 export function validateIP(rule, value,callback) {
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\
![](https://user-gold-cdn.xitu.io/2019/11/22/16e9182103044230?w=900&h=500&f=gif&s=662884).(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的IP地址'));
    } else {
      callback();
    }
  }
}

/**
 * 是否手机号码或者固话
 */
export function validatePhoneTwo(rule, value, callback) {
  const reg = /^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/;
  if (value == '' || value == undefined || value == null) {
    callback();
  } else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的电话号码或者固话号码'));
    } else {
      callback();
    }
  }
}

 /**
 * 是否身份证号码
 */
export function validateIdNo(rule, value,callback) {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if(value==''||value==undefined||value==null){
    callback();
  }else {
    if ((!reg.test(value)) && value != '') {
      callback(new Error('请输入正确的身份证号码'));
    } else {
      callback();
    }
  }
}

 /**
 * 是否邮箱
 */
export function validateEMail(rule, value,callback) {
  const reg =/^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  }else{
    if (!reg.test(value)){
      callback(new Error('请输入正确的邮箱'));
    } else {
      callback();
    }
  }
}

 /**
 * 是否仅包含英文数字以及下划线
 */
 export function isPassword(rule, value, callback) {
  const reg =/^[_a-zA-Z0-9]+$/;
  if(value==''||value==undefined||value==null){
    callback();
  } else {
    if (!reg.test(value)){
      callback(new Error('仅由英文字母，数字以及下划线组成'));
    } else {
      callback();
    }
  }
}

/**
 * 自动检验数值的范围
 */
 export function checkMax20000(rule, value, callback) {
  if (value == '' || value == undefined || value == null) {
    callback();
  } else if (!Number(value)) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else if (value < 1 || value > 20000) {
    callback(new Error('请输入[1,20000]之间的数字'));
  } else {
    callback();
  }
}

/**
 * 验证数字输入框最大数值
 */
 export function checkMaxVal(rule, value,callback) {
  if (value < 0 || value > 最大值) {
    callback(new Error('请输入[0,最大值]之间的数字'));
  } else {
    callback();
  }
}

/**
 * 验证是否整数
 */
export function isInteger(rule, value, callback) {
  if (!value) {
    return callback(new Error('输入不可以为空'));
  }
  setTimeout(() => {
    if (!Number(value)) {
      callback(new Error('请输入正整数'));
    } else {
      const re = /^[0-9]*[1-9][0-9]*$/;
      const rsCheck = re.test(value);
      if (!rsCheck) {
        callback(new Error('请输入正整数'));
      } else {
        callback();
      }
    }
  }, 0);
}

/**
 * 两位小数验证
 */
 const function validateValidity(rule, value, callback) => {
  if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
    callback(new Error('最多两位小数！！！'));
  } else {
    callback();
  }
};
/**
 * 中文校验
 */
export const validateContacts = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入中文'))
  }
  if (!/^[\u0391-\uFFE5A-Za-z]+$/.test(value)) {
    callback(new Error('不可输入特殊字符'))
  } else {
    callback()
  }
}

 /**
 * 账号校验
 */
 export const validateCode = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入账号'))
  }
  if (!/^(?![0-9]*$)(?![a-zA-Z]*$)[a-zA-Z0-9]{6,20}$/.test(value)) {
    callback(new Error('账号必须为6-20位字母和数字组合'))
  } else {
    callback()
  }
}
```