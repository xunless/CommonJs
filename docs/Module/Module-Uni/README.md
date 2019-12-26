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
