<template>
  <div>
    <Layout>aaa</Layout>
    <router-link to="/home">home</router-link>
    <router-link to="/test">test</router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Layout from '@/layout/index.vue'
</script>

<style scoped></style>
