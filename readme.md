# 使用 VitePress 创建的个人博客

这个仓库包含了我使用 [VitePress](https://vitepress.vuejs.org/) 构建的个人博客的源代码。VitePress 是一个快速、极简的静态网站生成器，基于 Vite 构建，非常适合用于文档网站、个人博客等内容驱动的项目。

## 项目简介:

该项目主要用于给自己一个文章或笔记可以发布的平台, 可以通过搜索来方便查阅, 以及有一个方便记录学习日志的平台

## 安装指南:

* 通过git bash输入命令行即可安装

```bash
git clone https://github.com/lyzhihs/my-vitepress-blog.git
```

* 本地运行

```bash
npm run docs:dev
```

* 本地部署

```bash
npm run docs:build
num run docs:preview
```

## 使用方法:

当写文章时可以直接在根目录下写一个目录或者文件

有两种导入文章的方式

> 1. 在 `.vitepress/config.mjs`里面找到这段代码
>
>    ```js
>        nav: [
>          { text: '首页', link: '/' },
>          { text: '关于', link: '/关于/' },
>          { text: '更新日志', link: '/updates' },
>          { text: '数据结构与算法', items: [
>            { text: '简介', link: '/数据结构与算法/'},
>            { text: '数据结构', link: '/数据结构与算法/数据结构/'},
>            { text: '算法', link: '/数据结构与算法/算法/'},
>          ] },
>          { text: 'JavaScript高级笔记', link: '/JavaScript高级笔记/' },
>        ],
>    ```
>
>    这样可以在首页的头部导航栏那里添加文章, 如果文章在同一个目录下, 在部署项目时将会自动生成左侧边栏, 左侧边栏的标题将会是 `.md` 文档的文件名, 并且可以实现跳转
>
> 2. 在项目的根路径下找到 `index.md` 文档里面会有一段
>
>    ```html
>    <FeatureList :features="[
>      { 
>        title: 'JavaScript高级', 
>        description: 'Detailed explanation of feature 1', 
>        color1: 'rgb(173 255 0)',
>        color2: '#00faff',  
>        link: './JavaScript高级笔记' 
>      },
>      { 
>        title: '数据结构', 
>        description: 'Detailed explanation of feature 2',
>        link: './数据结构与算法/数据结构'
>      },
>      { 
>        title: '数学建模', 
>        description: 'Detailed explanation of feature 4', 
>        color1: 'red', 
>        color2: 'blue',
>        link: './数学建模'
>      },
>      { 
>        title: 'Java', 
>        description: 'Detailed explanation of feature 4',
>        link: './Java学习笔记'
>      }
>    ]" />
>    ```
>
>    * `title` 指的是文章的标题
>    * `description` 会是文章的简单描述
>    * `color1` 和 `color2` 设置颜色的渐变(从左到右)
>    * `link` 是文章的路径
>
>    通过这样设置可以在首页的下方生成文章的简介框
>
> 3. 文章上传与部署
>
>    ```bash
>    git init
>    git add .
>    git commit -m "first commit"
>    git branch -M main
>    git remote add origin https://github.com/lyzhihs/my-vitepress-blog.git
>    git push -u origin main
>    ```
>
> 4. 这样只会自动部署项目和文章
>

## 文件结构

```
my-vitepress-blog/
├── .vitepress/
│   ├── config.mjs        # 配置文件，配置导航栏和其他设置
│   └── theme/
├── public/               # 静态资源文件夹
├── index.md              # 首页文件
├── 关于/更新日志.md        # 更新日志页面
├── 关于/                  # 关于页面
└── ...                   # 其他文章
└── package.json          # 项目配置文件
```

## 配置说明

- `.vitepress/config.mjs`：VitePress 的配置文件，主要用于配置页面结构、主题、插件等。
- `index.md`：项目的主页内容，可以修改此文件内容来定制博客首页。
- `/`：所有博客文章的目录，每篇文章可以放在一个文件夹里, 文件夹内部用`.md`写文章
- `public/`：静态资源文件夹，可以存放图片、样式表等资源。

## 许可证

本项目采用 [MIT 许可证](https://opensource.org/licenses/MIT)，您可以自由使用、修改和分发代码。