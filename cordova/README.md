# dinglian

> demo

## Build Setup

``` bash
步骤：

1.npm install -g cordova

# ／Cordova install dependencies
2.npm install
# ／Cordova／dinglian install dinglian project dependencies
3.进入dinglian的vue项目 npm install

4.如果是开发环境执行 npm run dev 需要在main.js  import '../static/mui/css/mui.min.css'
  打包npm run build 是将他注释，因为打包会对文件进行压缩，打包报错


打包步骤：
1. 在／Cordova／dinglian 执行 npm run build

2. 在 ／Cordova 下面ios:执行 cordova platform add ios
               andorid:执行 cordova platform add android

3.  在 ／Cordova 下面ios:执行 cordova build ios
                andorid:执行 cordova build  android

4. 通过Xcode生成ipa
