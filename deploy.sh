###
 # @Descripttion: 
 # @version: 1.0.0
 # @@Company: ZZCYI
 # @Author: 刘
 # @Date: 2020-04-11 14:14:49
 # @LastEditors: 刘
 # @LastEditTime: 2020-07-07 09:21:17
 # @Update Descripttion: 
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

git add .
git commit -m '新增安卓音频播放插件'
git push 

cd -