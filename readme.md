## 恒生数据webpack脚手架


### 脚手架使用错误解决
> TypeError: Cannot read properties of undefined (reading 'styles')

vue-loader 升级/降级到15.10.1  
```
npm i vue-loader@^15.10.1 -D
yarn add vue-loader@^15.10.1 -D
```

> webpack@"^2.0.0 || ^3.0.0 || ^4.0.0" from less-loader@5.0.0

脚手架中依赖的less-loader是5.0.0(项目中大多使用该版本，升级到6.0.0会有冲突)，在安装时会提示less-loader依赖webpack4一下版本，可以强制安装 
```
npm i @hsdata/webpack-config -f
```
或者降低node/nvm版本，使用16.10.0版本