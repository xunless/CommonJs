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
