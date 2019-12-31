<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 11:47:00
 * @LastEditors  : 王
 * @LastEditTime : 2019-12-26 10:17:00
 -->
## 基于uni.request封装的请求

::: tip 提示
   baseurl是请求接口的接口地址
:::
### 使用方法
  ``` javascript
import server from '@/utils/request.js'
export function login(param) {
	return server('login', 'post', param)
}
  ```

``` JavaScript
import { baseurl }  from './baseData.js'
// 一些错误code的提示
const errormessage={
  404:'请求出错,接口未找到'
}
function request(url, methods, type) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseurl + url,
			method: methods,
			timeout: 10000,
			data: type,
			header:{
				
			},
			success(res) {
          if(res.statusCode===200){
            resolve(res.data)
          }else {
              uni.showToast({
                icon:'none',
                title: errormessage[res.statusCode],
                duration: 2000
              });
            reject(res.data)
          }
	  	},
			fail(error) {
          uni.showToast({
          icon:'none',
          title: '未知异常，请重试！！！',
          duration: 2000
        });
				reject(error)
			}
		})
	})

}

export default request

```

## UNIAPP中图片上传
```javascript
/**
 * @param {url} url 接口地址
 * @param {Object} formData 需要向后台传递的参数
 * @return 接口返回数据
 * @description UNIAPP中图片上传 可根据实际接口进行修改
 * */
uploadImgFun(url, formData) {
  var that = this
  return new Promise((resolve, reject) => {
    uni.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      // sourceType: ['album'], //从相册选择
      success: function(res) {
        uni.showLoading({
          title: '正在上传中',
          mask: true
        })
        const path = res.tempFilePaths[0]
        console.log(path)
        uni.uploadFile({
          // that.$url.imgUrl 表示连接地址
          url: url,
          filePath: path,
          name: 'file',
          formData,
          success(res) {
            console.log(res)
            const data = JSON.parse(res.data)
            if (data.status !== 0) {
              uni.showToast({
                icon: 'none',
                title: data.message
              })
            } else {
              resolve(data.data)
            }
          }
        })
      }
    })
  })
}
```