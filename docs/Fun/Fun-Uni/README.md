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