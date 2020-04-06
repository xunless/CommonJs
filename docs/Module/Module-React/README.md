<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 11:47:00
 * @LastEditors: 王
 * @LastEditTime: 2020-04-06 10:38:54
 -->
## 封装无状态组件搜索框，提供多语言，回调函数返回Ipnut中值
``` javascript
import PageConterHeader from '@/components/UserCompoments/GlobalPageContHeader'
<PageConterHeader />
```
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|ok | 点击按钮 | Function|
|searchText| 点击按钮文字 | string|
|inputPlaceholderOne| 第一个输入框描述文字|string|
|inputPlaceholderTwo| 第二个输入框描述文字|string|
|inputPlaceholderThree| 第三个输入框描述文字|string|
## 页面添加按钮组件
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|ok | 点击按钮 | Function|
|searchText| 点击按钮文字 | string|
## 分页组件
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|onChange | 页数/每页数量变化触发 | Function|
|total| 总条数|string|
|pageSizeOptions| 每页N条配置|string[]|
|hideOnSinglePage| 只有一条时是否隐藏分页器|boolean|

 1.封装添加页面头部组件
``` javascript
import GlobalPageAddItemHeader from '@/components/UserCompoments/GlobalPageAddItemHeader'
<GlobalPageAddItemHeader />
```
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|click | 点击事件 | Function|
|title| icon后面文字|string|
|desc| 描述文字|string|
## 动画库组件
### 进出场动画，API文档[点击进入](https://motion.ant.design/api/queue-anim-cn)
``` javascript
import GlobalPageQueueAnim from '@/components/UserCompoments/GlobalPageQueueAnim'

 <GlobalPageQueueAnim content={Content} QAkey='page' /> 
```
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|content | 页面嵌套内容 | JSX.Element|
|QAkey| 动画Key|string|
```
##### 4.上传图片组件
``` javascript
import Upload from '@/components/UserCompoments/UpLoadFile'

<Upload setUrl={(url: string) => onFill(url)} />
```
| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|setUrl | 方法，返回上传成功的url | Function|
|maxSize| 文件最大(M)|number|
|fileName| 附带参数文件夹的名字|string|

## 地图组件
``` javascript 
import BdMap, { MapResultInfoProps } from '@/components/UserCompoments/BdMap'
<BdMap onChange={e => { mapOnchange(e) }} />
```
> 返回据类型可直接使用```MapResultInfoProps```

| 参数 | 用途 | 类型 |
| ------ | ------ | ------ |
|onChange | 地图点击或搜索改变时触发,返回数据 | Function|
|enableScrollWheelZoom| 是否开启滚轮方法缩小地图|boolean|
|showLocalControl| 是否开启放大/缩小控件|boolean|
|width| 地图的宽度|string|
|height| 地图的高度|string|
|akay| 百度地图Key|string|
> 使用方法
``` javascript
import TweenOne from 'rc-tween-one';
const ChildrenPlugin = require('rc-tween-one/lib/plugin/ChildrenPlugin')
TweenOne.plugins.push(ChildrenPlugin);
const Twe: any = TweenOne
  <Twe animation={{ Children: { value: prop.number | 0, floatLength: 0, formatMoney: true } }} style={{ fontSize: 36, paddingTop: 16 }}> 0 
  </Twe>
```
## 删除弹窗

``` javascript
import PageDialogDelete from '@/components/UserCompoments/PageDialogDelete'

  // 打开弹窗
  const deleteItem = (e: ApiTableInfoType) => {
    deleteRef.current.changeVal(true)
  }
  // 定时关闭弹窗
  const isdetile = () => {
    deleteRef.current.changeLoading(true)
    setTimeout(() => {
      deleteRef.current.changeVal(false)
      deleteRef.current.changeLoading(false)
    }, 1500);
  }
 <PageDialogDelete cRef={deleteRef} ok={isdetile} handleCancel={() => deleteRef.current.changeVal(false)} />

```