<template>
  <Layout>
    <template #doc-after>
      <div class="giscus-wrapper">
        <Giscus
          :key="page.filePath"
          repo="lyzhihs/my-vitepress-blog"
          repo-id="R_kgDON51SDg"
          category="Announcements"
          category-id="DIC_kwDON51SDs4CqYHg"
          mapping="pathname"
          strict="0"
          reactions-enabled="1"
          emit-metadata="0"
          input-position="bottom"
          lang="zh-CN"
          crossorigin="anonymous"
          :theme="isDark ? 'dark' : 'light'" 
        />
      </div>
    </template>
  </Layout>
</template>

<script setup lang="ts">
import Giscus from "@giscus/vue";
import DefaultTheme from "vitepress/theme";
import { watch } from "vue";
import { inBrowser, useData } from "vitepress";

const { isDark, page } = useData();
const { Layout } = DefaultTheme;

// 添加页面路径变化监听
watch(() => page.value.relativePath, () => {
  if (inBrowser) {
    setTimeout(() => {
      const iframe = document.querySelector('giscus-widget')?.shadowRoot?.querySelector('iframe');
      iframe?.contentWindow?.location.reload();
    }, 300);
  }
});

// 优化主题切换逻辑
watch(isDark, (dark) => {
  if (!inBrowser) return;
  
  const giscusWidget = document.querySelector('giscus-widget');
  if (giscusWidget) {
    giscusWidget.setAttribute('theme', dark ? 'dark' : 'light');
  }
}, { immediate: true });
</script>

<style scoped>
.giscus-wrapper {
  max-width: 760px;
  margin: 2rem auto 4rem;
  padding: 0 1rem;
}
</style>
   