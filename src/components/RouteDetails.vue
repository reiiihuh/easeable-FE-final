<template>
    <transition name="slide-up">
      <div class="route-details" v-if="visible">
        <div class="header">
        <div class="spacer" ></div>
        <span class="room-title">{{ roomName }}</span>
        <span class="close-icon material-icons" @click="$emit('close')">close</span>
    </div>

  
        <div class="steps">
          <div class="step" v-for="(step, index) in steps" :key="index">
            <span class="material-icons icon">{{ step.icon }}</span>
            <div class="info">
              <p class="instruction">{{ step.instruction }}</p>
              <p class="sub">{{ step.sub }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { directionIcons } from '../data/NavigationData';
  
  const props = defineProps({ visible: Boolean });
  const route = useRoute();
  
  const roomName = route.params.roomName;
  const steps = ref([]);
  
  onMounted(async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/slides/${encodeURIComponent(roomName)}`);
      steps.value = res.data.map(step => ({
        icon: directionIcons[step.arah?.toLowerCase()] || 'help_outline',
        instruction: step.deskripsi_langkah,
        sub: step.jarak || '',
      }));
    } catch (err) {
      console.error('Failed to fetch route details:', err);
    }
  });
  </script>
  
  
  <style scoped>
  .slide-up-enter-active,
  .slide-up-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: translateY(100%);
  }
  
  .route-details {
    position: absolute;
    bottom: 100px; /* jarak dari bottom panel */
    left: 0px;
    right: 0px;
    background: white;
    border-radius: 20px 20px 0 0;
    /* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.15); */
    padding: 20px;
    z-index: 10;
    max-height: 60vh;
    overflow-y: auto;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 16px;
  }
  
  .close-icon {
    cursor: pointer;
  }
  

  .steps {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .step {
    display: flex;
    align-items: flex-start;
    gap: 12px;
  }
  
  .icon {
    font-size: 28px;
  }
  
  .info {
    display: flex;
    flex-direction: column;
  }
  
  .instruction {
    font-weight: bold;
    margin: 0;
  }
  
  .sub {
    font-size: 12px;
    color: #666;
    white-space: pre-line;
  }
  </style>
  