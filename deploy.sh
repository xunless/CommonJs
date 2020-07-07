###
 # @Descripttion: 
 # @version: 1.0.0
 # @@Company: ZZCYI
 # @Author: 刘
 # @Date: 2020-04-11 14:14:49
 # @LastEditors: 刘
 # @LastEditTime: 2020-07-07 10:38:03
 # @Update Descripttion: 
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

git add .
git commit -m 'JAVA 地址三级联动JSON'
git push 

cd -