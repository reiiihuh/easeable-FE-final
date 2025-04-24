<template>
    <transition name="fade">
      <div v-if="show" class="modal-backdrop">
        <div class="modal-container">
          <h2 class="modal-title">Konfirmasi</h2>
          <p class="modal-message">Apakah kamu yakin ingin menyelesaikan perjalanan?</p>
          <div class="modal-actions">
            <button @click="$emit('cancel')" class="btn cancel">Batal</button>
            <button @click="$emit('confirm')" class="btn confirm">Ya, Selesai</button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    show: Boolean,
  });
  defineEmits(['confirm', 'cancel']);
  </script>
  
  <style scoped>
  /* Modal Layout */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal-container {
    background: white;
    padding: 1.5rem;
    border-radius: 12px;
    width: 100%;
    max-width: 300px;
    text-align: center;
  }
  .modal-title {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  .modal-message {
    margin-bottom: 1rem;
  }
  .modal-actions {
    display: flex;
    justify-content: space-around;
  }
  .btn {
    padding: 0.5rem 1.2rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
  .btn.cancel {
    background-color: #f32f2f;
    color: #fff;
  }
  .btn.confirm {
    background-color: #3b82f6;
    color: white;
  }
  
  /* Fade transition */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  </style>  