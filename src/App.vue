<script setup>
import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  document.documentElement.style.backgroundImage = "url('/src/assets/bg_green.png')";
  document.documentElement.style.backgroundSize = "cover";
  document.documentElement.style.backgroundRepeat = "no-repeat";
  document.documentElement.style.backgroundPosition = "center";
  document.documentElement.style.height = "100%";
  document.body.style.background = "transparent";
});

onBeforeUnmount(() => {
  document.documentElement.style.backgroundImage = '';
  document.documentElement.style.backgroundSize = '';
  document.documentElement.style.backgroundRepeat = '';
  document.documentElement.style.backgroundPosition = '';
  document.documentElement.style.height = '';
});
</script>


<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style scoped>
  * {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Poppins', sans-serif;
  }
</style>
