<template>
  <section class="features">
    <div class="feature-list">
      <div v-for="(feature, index) in features" :key="index" class="feature-item">
        <a :href="feature.link" class="feature-link">
          <h3 :style="getGradientStyle(feature)">{{ feature.title }}</h3>
        </a>
        <p>{{ feature.description }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  features: {
    type: Array,
    default: () => [
      { title: 'Feature 1', description: 'Description of feature 1', color1: '#bd34fe', color2: '#47caff', link: '/feature-1' },
      { title: 'Feature 2', description: 'Description of feature 2', color1: 'red', color2: 'blue', link: '/feature-2' },
    ]
  }
});

const getGradientStyle = (feature) => {
  const color1 = feature.color1 || '#bd34fe'; // 默认颜色
  const color2 = feature.color2 || '#47caff'; // 默认颜色
  return {
    background: `linear-gradient(to right, ${color1}, ${color2})`
  };
}
</script>

<style scoped>
.vp-doc h3 {
  margin: 0;
  letter-spacing: -0.01em;
  line-height: 28px;
  font-size: 20px;
}

.features {
  padding: 20px;
}

.feature-list {
  display: flex;
  gap: 20px;
}

.feature-item {
  border: 1px solid #eaeaea;
  border-radius: 5px;
  transition: all 0.3s ease; /* 添加平滑过渡 */
}

.feature-item:hover {
  transform: scale(1.05); /* 放大一点 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  z-index: 1; /* 确保高亮时显示在前面 */
}

.feature-item h3 {
  width: 270px;
  height: 80px;
  line-height: 80px;
  margin: 0 auto;
  border-bottom: 1px solid #eaeaea;
  border-radius: 5px 5px 0 0;
  text-align: center;
}

.feature-item p {
  width: 270px;
  height: 80px;
  margin: 15px 0;
  padding: 0 12px;
}

.feature-link {
  display: block;
  text-decoration: none;
}
</style>
