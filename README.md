## lyfa-preview
纯js实现的图片预览脚本库，可支持局部放大、旋转，全屏等

## 在线体验
[预览](https://tcly861204.github.io/lyfa-preview/)

## 使用
1. 安装
> npm i lyfa-preview

2. 在script标签中使用
> <script src="./dist/main.min.js"></script>
> <link rel="stylesheet" href="./dist/style.min.css">

3. 在模块代码中使用

```
import Preview from 'lyfa-preview'
import 'lyfa-preview/dist/style.min.css'
```

4. 调用预览组件
```
new Preview({
  list: [
    {
      ext: 'jpeg',
      name: '预览图片',
      src: './public/meinv.jpeg'
    }, {
      ext: 'jpeg',
      name: '预览图片',
      src: './public/fengjin.jpeg'
    }
  ]
}).display(0) 
```