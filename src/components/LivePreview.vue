<template>
    <transition name="fade">
      <div class="live-overlay" v-if="visible">
        <div class="preview-box">
          <button class="close-button" @click="$emit('close')">
            <span class="material-icons">close</span>
          </button>
          <img :src="gifUrl" alt="Live Preview" class="preview-gif" />
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    visible: Boolean,
    gifUrl: String,
  });
  </script>
  
  <style scoped>
  .live-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }
  .preview-box {
    position: relative;
    background: white;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.3);
  }
  .preview-gif {
    width: 300px;
    height: auto;
    border-radius: 5px;
  }
  .close-button {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: white;
  }
  </style>  