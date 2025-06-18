<template>
  <div class="room-detail-overlay">
    <div class="room-detail">
      <!-- Tombol Close -->
      <button class="close-button" @click="$emit('close')">
        <span class="material-icons">close</span>
      </button>

      <!-- Gambar Ruangan -->
      <img v-if="images.length" :src="images[0]" class="room-image" />

      <!-- Info Ruangan -->
      <div class="room-info">
        <h2>{{ roomData.name }}</h2>
        <p>{{ roomData.location }}</p>

        <h3>Informasi Tambahan</h3>
        <ul>
          <li v-for="(info, index) in roomData.additionalInfo" :key="index">
            {{ info }}
          </li>
        </ul>

        <button
          class="detail-button"
          @click="goToSlideshow"
        >
          Detail perjalanan
        </button>
      </div>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  room: Object
});

const router = useRouter();
const images = ref([]);
const roomData = ref(props.room); // langsung dari props

onMounted(() => {
   images.value = roomData.value.image ? [roomData.value.image] : [];
});

function goToSlideshow() {
  if (props.room?.name) {
    router.push({ name: 'Slideshow', params: { roomName: props.room.name } });
  } else {
    alert("Nama ruangan tidak valid.");
  }
}
</script>


  
  
<style scoped>
.room-detail-overlay {
  position: fixed;
  inset: 0;
  /* background: rgba(0, 0, 0, 0.1); */
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.room-detail {
  background: #fff;
  width: 100%;
  max-width: 300px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #fff;
}

.room-image {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
}

.room-info {
  font-size: 1rem;
  padding: 20px;
  text-align: left;
}

h2 {
  font-size: 18px;
  margin-bottom: 5px;
}

h3 {
  font-size: 16px;
  margin-top: 15px;
}

.detail-button {
  width: 100%;
  padding: 10px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  margin-top: 15px;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.detail-button:hover {
  background: #45a049;
}
</style>

  