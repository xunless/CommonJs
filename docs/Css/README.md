### 巧妙使用flex布局实现手机自定义
Html布局代码，使用改布局即可解决在各移动设备的顶部Tab切换，下方需要无限加载布局。
PS:案例视图



<a data-fancybox title="xx" href="/images/css/ps01.jpg">![案例视图](/images/css/ps01.jpg)</a>
``` html
  <view class="container">
    <view style="height:300rpx">固定在头部的标题</view>
     <scroll-view scroll-y>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
       <view style="line-height:100rpx">啊啊啊啊啊</view>
     </scroll-view>
</view>
```
 CSS布局
``` css
    page{ 
      height: 100%; 
    }
    .container{ 
      display: flex;
      flex-direction: column;
      height: 100vh; 
    }
    scroll-view{ 
      flex: 1;
      height: 1px;
      background: #ccc 
    }
```