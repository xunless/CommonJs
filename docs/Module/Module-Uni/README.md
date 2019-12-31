<!--
 * @Desc: ---   ----
 * @Date: 2019-12-23 11:47:00
 * @LastEditors  : 王
 * @LastEditTime : 2019-12-26 09:33:23
 -->
## 隐藏式状态栏

::: tip 思路解析
  利用页面滚动事件,背景色的透明度动态改变透明度实现。
:::

### HTML结构
``` html
  <view class="gradual-header" :style="'background: rgba(45,168,150,' + diaphaneity + ')'">
			<view class="status_bar"></view>
			<view class="page-header"><view class="title">{{diaphaneity>0?'首页':''}}</view></view>
	</view>
```
### css样式
``` css
.gradual-header {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
```
### JS部分
``` javascript
  export default {
	data() {
		return {
			diaphaneity: 0
		};
	},
	onLoad() {},
	methods: {},
	// 渐变状态栏
  // 页面混动事件
	onPageScroll(e) {
		this.diaphaneity = e.scrollTop / 100;
	}
};

```

## 数据状态组件(uni-app)

### 示例
![image](/images/uniStepsShow.png)

组件名：uni-steps

[组件下载地址](https://files.cnblogs.com/files/baobao0205/uni-steps.rar)

### 使用方式
* 在 script 中引用组件
```javascript
  import uniSteps from '@/components/uni-steps/uni-steps.vue'
  export default {
    components: {uniSteps}
  }
```
* 在 template 中的使用
```html
  <uni-steps :options="options" :success-icon="successimg" :error-icon="errorimg"></uni-steps>
```
* 属性说明
  属性名 | 类型 | 默认值 | 说明
  -|-|-|-
  options | Array|  | 格式为：[{title:'xxx',state:'1'},{title:'xxx',state:'0'}] title: 显示内容  state: 状态 1成功 0失败
  successIcon | String|  | 状态为'1'时显示的图标
  errorIcon | String|  | 状态为'0'时显示的图标
  rowColor | String | #3D97FF| 图标下竖线的颜色
  borderColor | String | #c8c7cc| 显示内容下横线的颜色

## 常见商城滚动分类

### 示例
![image](/images/cg-swiper.png)  

组件名 cg-swiper  

[组件下载地址](https://github.com/ChamHuang/web/blob/master/uniapp/cg-swiper.vue)
### 使用方式
* 在 script 中引入
```js
import cgSwiper from '@/components/cg-swiper.vue'
export default {
	components: {cgSwiper}
}
```
* 在 template 中的使用
```html
<cg-swiper :swiperList="channelCategoryList" @clickItem="handleCategory" swiperActiveColor="#3D97FF"></cg-swiper>
```
* 属性说明
	属性名 | 类型 | 默认值 | 说明
  -|:-:|:-:|-
  swiperDots | Boolean| false | 
  swiperColor | String| #999999 | 指示点颜色
  swiperActiveColor | String| #FFCC00 | 选中指示点颜色
  autoplay | Boolean | false| 是否自动切换
  interval | Number | 5000 | 自动切换时长
  duration | Number | 500 | 滑动动画时长  
  circular | Boolean | false | 是否衔接滑动
  swiperList | Array | [] | 数据
  customize | Boolean | true | 是否开启自定义指示点
  number | Number | 8 | 一屏显示的数量
* 方法说明
  methods | 说明
  -|-
  handleCategory | 接收参数item处理点击事件
  clickItem | 子组件向父组件传值的事件名
  

## 常见分类分段器

### 示例
![image](/images/segmentedControl.png)  

组件名 ui-tags 

[组件下载地址](https://github.com/ChamHuang/web/blob/master/uniapp/ui-tags.vue)
### 使用方式
* 在 script 中引入
```js
import uiTags from '@/components/ui-tags.vue'
export default {
	components: {uiTags}
}
```
* 在 template 中的使用
```html
<ui-tags :current="current" :values="list" @clickItem="onClickItem"></ui-tags>
```
* 属性说明
	属性名 | 类型 | 默认值 | 说明
  -|:-:|:-:|-
  values | Array| [] | 数组格式为 [{name: '全部', name: '其他'}]
  current | Number| 0 | 当前选中的值
* 方法说明
	方法名 | 类型 | 说明
  -|:-:|-
  onClickItem | Fun | 向父组件传递两个值（currentIndex 为当前的索引,currentItem 为当前的对象）
  clickItem | Fun | 监听父组件事件名

  ## 自定义 navbar

### 示例
![image](/images/navbar.png)  

组件名 navbar 

[组件下载地址](https://github.com/ChamHuang/web/blob/master/uniapp/navbar.vue)
### 使用方式
* 在 script 中引入
```js
import navbar from '@/components/navbar.vue'
export default {
	components: {navbar}
}
```
* 在 template 中的使用
```html
<navbar :title="i18n.title1" :languageFlag="true" @handleSelectLanuage="handleSelectLanuage" icon="../../static/img/icon-search.png"></navbar>
```
* 属性说明
	属性名 | 类型 | 默认值 | 说明
  -|:-:|:-:|-
  inputFlag | Boolean| false | 是否显示input输入框
  disabled | Boolean| false | 是否禁用输入框
  backFlag | Boolean| false | 是否显示返回图标
  title | String| '商城' | navbar标题
  icon | String| '' | languageFlag 为true时 icon显示的图标
  languageFlag | Boolean| false | 是否显示右侧图标 *可以进行优化*
  languageFlag | Boolean| false | 是否显示右侧图标
  edit | String| '完成' | confirmFlag 为true 右侧显示文字
  confirmFlag | Boolean| false | 是否显示右侧文字
* 方法说明
	方法名 | 类型 | 说明
  -|:-:|-
  handleBack | Fun | 监听返回事件
  handleSelectLanuage | Fun | 监听右上角图片事件
  handleEdit | Fun | 监听右上角文字事件
  handleSearch | Fun | 监听搜索按钮

## 自定义 ui-cell

### 示例
![image](/images/ui-cell.png)  

组件名 uiCell

[组件下载地址](https://github.com/ChamHuang/web/blob/master/uniapp/ui-cell.vue)
### 使用方式
* 在 script 中引入
```js
import uiCell from '@/components/ui-cell.vue'
export default {
	components: {uiCell}
}
```
* 在 template 中的使用
```html
<ui-cell :title="i18n.totalXpense" :arrow="false" :right="'￥' + list.cost"></ui-cell>
```
* 属性说明
	属性名 | 类型 | 默认值 | 说明
  -|:-:|:-:|-
  padding | Boolean| false | 是否使用 app-container 类名
  arrow | Boolean| true | 默认是否显示箭头
  right | String| null | 右侧显示的文字内容
  title | String| '标题' | 左侧显示标题内容
  del | Boolean| false | 是否显示删除图标
  obj | Object| null | 删除需要传的对象
* 方法说明
	方法名 | 类型 | 说明
  -|:-:|-
  handleClick | Fun | 监听点击事件
  handleDel | Fun | 监听删除事件 向父组件传obj对象