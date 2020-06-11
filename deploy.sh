###
 # @Descripttion: 
 # @version: 1.0.0
 # @@Company: ZZCYI
 # @Author: 刘
 # @Date: 2020-04-11 14:14:49
 # @LastEditors: 刘
 # @LastEditTime: 2020-06-11 10:18:35
 # @Update Descripttion: 
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

git add .
git commit -m '新增极光推送iOS插件 '
git push 

cd -