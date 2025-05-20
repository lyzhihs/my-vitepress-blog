<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
const { page } = useData()
</script>

<template>
  <Layout>
    <template #doc-after>
      <ClientOnly>
        <div class="giscus-wrapper">
          <script 
            src="https://giscus.app/client.js"
            data-repo="lyzhihs/my-vitepress-blog"
            data-repo-id="R_kgDON51SDg"
            data-category="Announcements"
            data-category-id="DIC_kwDON51SDs4CqYHg"
            data-mapping="pathname"
            data-strict="0"
            data-reactions-enabled="1"
            data-emit-metadata="0"
            data-input-position="bottom"
            data-theme="light"
            data-lang="zh-CN"
            crossorigin="anonymous"
            async
          ></script>
        </div>
      </ClientOnly>
    </template>
  </Layout>
</template>

<style scoped>
.giscus-wrapper {
  max-width: 760px;
  margin: 0 auto;
  padding: 2rem 0 4rem;
}
</style>