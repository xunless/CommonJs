<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 11:47:00
 * @LastEditors: 王
 * @LastEditTime: 2020-04-11 14:11:43
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

## APP更新
```html
<uni-popup ref="popupDown" type="center" :maskClick="!downLoadIng">
  <view class="confirmbox">
    <view class="title">版本更新</view>
    <view class="center" v-if="!downLoadIng">确定更新应用么</view>
    <view class="btns" v-if="!downLoadIng">
      <view class="btn" @tap="closePropDown">取消</view>
      <view class="btn" @tap="confirmBtnDown">确认</view>
    </view>
    <load-line class="title" v-if="downLoadIng" loadType="line" :loadText="loadText" :lineInfo="lineInfo" :loadPercent="loadPercent"></load-line>
  </view>
</uni-popup>
```

```javascript
import uniPopup from '@/components/uni-popup/uni-popup.vue';
export default {
  components: {
    uniPopup
  },
  data() {
    return {
      downLoadIng: false,
      lineInfo: {
        colorChange: false,
        loadColor: '#6ee2e1,#2ba98c,#a07e1e'
      },
      loadText: '正在下载更新，请耐心等待:',
      loadPercent: 0,
      appversion: '',
      serverversion: ''
    };
  },
  methods: {
    // 获取当前版本和最新版本信息
    getNewVersion(){
      let this_ = this;
      plus.runtime.getProperty(plus.runtime.appid, async function(wgtinfo) {
        this_.appversion = wgtinfo.version;
        // 请求最新版本信息
        this_.$http.request({
          method: 'get',
          url: qrSoftVersion,
          params: {
            versionType: 'APP版本',
            pageIndex: 1,
            pageSize: 1
          }
        }).then(res => {
          if (res.resultCode == 1) {
            if (res.data.lsList.length > 0) {
              this_.serverversion = res.data.lsList[0]
            } else {
              let serverversionObj = {
                versionName: this_.appversion
              }
              this_.serverversion = serverversionObj;
            }
            if (this_.serverversion.versionName > this_.appversion) {
              this_.appversion = 0
            }
          }
        }).catch(err => {
      
        })
      });
    },
    /**
     * 显示版本更新弹窗
     * */
    showDown() {
      if (this.serverversion && this.appversion >= this.serverversion.versionName) {
        plus.nativeUI.toast('已是最新版本')
      } else {
        this.$refs.popupDown.open();
      }
    },
    closePropDown() {
      this.$refs.popupDown.close();
    },
    confirmBtnDown() {
      this.downLoad(this.serverversion);
    },
    //下载新版本
    downLoad(ver) {
      let this_ = this;
      let fileName = ''
      if (ver.versionPath && ver.versionPath.indexOf('apk') > 0) {
        if (plus.os.name == 'Android') {
          fileName = ver.versionPath;
        } else if (plus.os.name == 'iOS') {
          // ios应用平台链接
          plus.runtime.openURL("https://itunes.apple.com/cn/app/%E6%98%93%E4%BB%A5%E5%85%BB%E8%BD%A6/id1434960351?mt=8");
          return;
        }
      } else {
        fileName = ver.versionPath;
      }
      this_.downLoadIng = true;
      const downloadTask = uni.downloadFile({
        url: apiBaseUrl + fileName,
        success: (res) => {
          this_.downLoadIng = false;
          this_.closePropDown();
          if (res.statusCode === 200) {
            console.log('下载成功');
            this_.installWgt(res.tempFilePath);
          } else {
            this_.toast("下载更新资源失败！");
          }
        }
      });

      downloadTask.onProgressUpdate((res) => {
        this_.loadPercent = res.progress;
      });

    },
    installWgt(path) {
      plus.nativeUI.showWaiting("安装更新资源...", {
        back: "none"
      });
      plus.runtime.install(path, {}, function() {
        plus.nativeUI.showWaiting("应用资源更新完成！");
        setTimeout(function() {
          if (path.indexOf('wgt') > 0) {
            plus.nativeUI.closeWaiting();
            plus.runtime.restart();
          } else {
            plus.runtime.quit();
          }
        }, 1000)

      }, function(e) {
        plus.nativeUI.closeWaiting();
        uni.showModal({
          title: '提示',
          content: "安装文件失败[" + e.code + "]：" + e.message,
          success() {

          }
        })
    })
  }
}
```
## uni-app 使用阿里iconfont

- 1.在阿里图标库我的项目中，在未下载到本地之前 点击上方更多操作-编辑项目-Font Family中的值换个名称(自定义)

- 2.将所需的icon项目下载到本地.

- 3.在项目中创建一个公用的css文件,在此文件下加个iconfont文件 将下载的文件下里的iconfont.css,iconfont.ttf,iconfont.svg复制到上述文件下

- 4.按下述代码配置修改iconfont.css文件

- style
  ```css
    @font-face {font-family: "apIconfont";
      src: url('~@/static/css/font1/iconfont.ttf?t=1587949784818') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
      url('~@/static/css/font1/iconfont.svg?t=1587949784818#apIconfont') format('svg'); /* iOS 4.1- */
    }

    .apIconfont {
      font-family: "apIconfont" !important;
      font-size: 16px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .icon-saoyisao:before {
      content: "\e696";
    }

  ```
- 在App.vue或者所需界面导入iconfont.css

- style

  ```css
    @import '@/static/css/font1/iconfont.css';

  ```



## 获取元素页面位置

```jsx
// id为元素id
uni.createSelectorQuery().select(id).boundingClientRect(function(rect){
	console.log(rect, 'rect')
	// rect.id      // 节点的ID
	// rect.dataset // 节点的dataset
	// rect.left    // 节点的左边界坐标
	// rect.right   // 节点的右边界坐标
	// rect.top     // 节点的上边界坐标
	// rect.bottom  // 节点的下边界坐标
	// rect.width   // 节点的宽度
	// rect.height  // 节点的高度
}).exec()
                    
```

