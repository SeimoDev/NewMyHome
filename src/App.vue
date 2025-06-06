<script setup lang="ts">
import config from './site.config'
</script>

<template>
  <main class="container">
    <header class="hero">
      <h1>{{ config.title }}</h1>
      <p>{{ config.description }}</p>
    </header>
    <section v-for="section in config.sections" :key="section.title" class="section">
      <h2>{{ section.title }}</h2>
      <p>{{ section.content }}</p>
    </section>
  </main>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}
.hero {
  text-align: center;
  margin-bottom: 2rem;
}
.hero h1 {
  font-size: 2.5rem;
  margin: 0.5rem 0;
  background: linear-gradient(90deg, #42b883 0%, #646cff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.section {
  width: 100%;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 8px;
}
.section h2 {
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #646cff;
}
@media (max-width: 600px) {
  .container {
    padding: 1rem;
  }
  .hero h1 {
    font-size: 2rem;
  }
}
</style>
