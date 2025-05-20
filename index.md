---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "我的个人博客"
  text: "积跬步，至千里。"
  tagline: 我的第一个个人博客，用于记录学习过的技术，和上传一些文章。
  image:
    src: /logo.png
    alt: vitepress
  actions:
    - theme: brand
      text: 个人档案
      link: /个人档案
    - theme: alt
      text: 关于博客的心得
      link: /关于博客的心得


---

<FeatureList :features="[
  { 
    title: 'JavaScript高级', 
    description: 'Detailed explanation of feature 1', 
    link: './JavaScript高级笔记' 
  },
  { 
    title: '数据结构', 
    description: 'Detailed explanation of feature 2',
    color2: '#bd34fe',
    color1: '#47caff',
    link: './数据结构与算法/数据结构'
  },
  { 
    title: '数学建模', 
    description: 'Detailed explanation of feature 4', 
    link: './数学建模'
  },
  { 
    title: 'Java', 
    description: 'Detailed explanation of feature 4',
    color2: '#bd34fe',
    color1: '#47caff',
    link: './Java学习笔记'
  }
]" />
