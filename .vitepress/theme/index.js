// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import FeatureList from './FeatureList.vue'
import MyLayout from './MyLayout.vue'
import './style.css'

/** @type {import('vitepress').Theme} */
export default {
  Layout: MyLayout,
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // ...
    app.component('FeatureList', FeatureList)
  }
}
