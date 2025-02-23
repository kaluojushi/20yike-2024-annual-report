# 20yike-2024-annual-report

我的二十年一刻 2024 观演报告📰

项目主页：<https://20yike-report.sodaguide.io>

项目源码：<https://github.com/kaluojushi/20yike-2024-annual-report>

选择你所去过的场次，查看你的苏打绿二十年一刻巡回演唱会 2024 年度观演报告。

采用 Vue3 框架，无缝翻页效果利用 Swiper 实现。

参考项目：<https://github.com/rulihongran/AnnualTravelReport>

## 项目结构

- `bg`：背景图片
- `code`：项目代码
  - `public`：公共资源，包含网站图标、Vue 入口 HTML
  - `src`：项目源码
    - `assets`：资源文件，包含图片、CSS 等
    - `components`：组件，包含页面组件、单个组件等
    - `App.vue`：Vue 入口
    - `main.js`：JS 入口
- `image`：项目截图

## 项目启动

```
cd code
npm install
npm run serve
```

项目启动后，访问 <http://localhost:8080> 即可查看项目。

## 项目打包

```
cd code
npm run build
```

生成的 `code/dist` 目录即为项目打包后的静态资源。
