<template>
  <div class="container">
    <!-- Logo -->
    <div class="logo">
      <img src="/src/assets/logo.png" alt="">
    </div>

    <!-- Search Bar -->
    <div v-if="!selectedRoom" class="search-wrapper">
      <div class="search-container" :class="{ 'active': searchQuery }">
        <input type="text" v-model="searchQuery" placeholder="Mau kemana nih?" class="search-input" />
        <span class="material-icons search-icon">search</span>
      </div>

<!-- Search Results -->
<transition name="fade-slide">
  <div v-if="!selectedRoom && searchQuery" class="search-results">
    <div class="room-list" v-if="filteredRooms.length">
      <div 
        v-for="room in filteredRooms" 
        :key="room.id" 
        class="room-item"
        @click="selectRoom(room)"
        @mouseover="hoveredRoom = room.id"
        @mouseleave="hoveredRoom = null"
        :class="{ 'hovered': hoveredRoom === room.id }"
      >
        <strong>{{ room.name }}</strong>
        <p>{{ room.location }}</p>
      </div>
    </div>
    <div v-else class="no-result">
      <p>Lokasi tidak tersedia</p>
    </div>
  </div>
</transition>

    </div>

    <!-- Room Detail -->
    <transition name="slide">
      <RoomDetail
        v-if="selectedRoom"
        :room="selectedRoom"
        @close="selectedRoom = null"
      />
    </transition>

    <!-- Icons
    <div v-if="!selectedRoom" class="icon-container">
      <span class="material-icons">accessible</span>
      <span class="material-icons">assist_walker</span>
    </div> -->

    <!-- Description -->
    <div v-if="!selectedRoom" class="description">
      <h1>EaseAble akan membantu perjalanan anda!</h1>
      <p>Kami akan membantu anda mencapai lokasi tujuan</p>
    </div>

    <!-- Supported By -->
    <div v-if="!selectedRoom" class="supported-by">
      <p>Supported by :</p>
      <div class="logo-container">
        <img src="../assets/logosc.png" alt="">
        <img src="../assets/logo fit.png" alt="">
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';
import RoomDetail from '../components/RoomDetails.vue';

const searchQuery = ref('');
const selectedRoom = ref(null);
const hoveredRoom = ref(null);

const rooms = ref([
  { id: 1, name: "Ruang A1", location: "Lt.2 Gedung Selaru, Fakultas Ilmu Terapan" },
  { id: 2, name: "Ruang A2", location: "Lt.2 Gedung Selaru, Fakultas Ilmu Terapan" },
  { id: 3, name: "Ruang A3", location: "Lt.2 Gedung Selaru, Fakultas Ilmu Terapan" },
  { id: 4, name: "Ruang A4", location: "Lt.2 Gedung Selaru, Fakultas Ilmu Terapan" },
  { id: 5, name: "Ruang A5", location: "Lt.2 Gedung Selaru, Fakultas Ilmu Terapan" }
]);

const filteredRooms = computed(() => {
  if (!searchQuery.value.trim()) return [];
  return rooms.value.filter(room =>
    room.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ).slice(0, 3);
});

const noResultFound = computed(() => {
  return searchQuery.value.trim() !== '' && filteredRooms.value.length === 0;
});

const selectRoom = (room) => {
  selectedRoom.value = room;
};
</script>


<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 97vh;
  /* background: url('/src/assets/bg_green.png');
  background-size: cover; */
  text-align: center;
  padding: 20px;
}

.search-wrapper {
  position: relative;
  width: 80%;
  max-width: 500px;
  margin-top: 20px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}
/* Responsive search bar*/
@media (max-width: 768px) {
  .search-wrapper {
    width: 90%;
  }

  .search-input {
    font-size: 14px;
    padding: 10px 35px 10px 35px;
  }

  .search-icon {
    font-size: 20px;
  }
}

.search-icon {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #aaa;
}

.search-results {
  width: 95%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 2px;
  margin-top: 5px;
  padding: 10px;
  position: absolute;
  top: 100%;
  left: 0;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  z-index: 10;
  max-height: 180px;
  overflow-y: auto;
  font-size: 1rem;
}

/* Responsive tweak jika diperlukan */
@media (max-width: 480px) {
  .search-wrapper {
    width: 90%;
  }
}


.room-item {
  padding: 8px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
  transition: background 0.3s ease;
}

.room-item:hover, .hovered {
  background: #f4f4f4;
  /* font-weight: bold; */
}

.icon-container {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.icon-container .material-icons {
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 20px;
}

.description {
  margin-top: 20px;
}

.description h1 {
  font-size: 18px;
  font-weight: bold;
}

.description p {
  color: gray;
  font-size: 14px;
}

.supported-by {
  margin-top: 30px;
}

.supported-by p {
  font-size: 14px;
  color: gray;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-top: 20px;
  flex-wrap: wrap; 
}

.logo-container img {
  height: 50px;
  max-width: 100%;
  object-fit: contain;
}

/* Responsive logo supported by */
@media (max-width: 768px) {
  .logo-container {
    gap: 20px;
  }

  .logo-container img {
    height: 50px;
  }
}

@media (max-width: 480px) {
  .logo-container {
    flex-direction: column;
    gap: 15px;
  }

  .logo-container img {
    height: 45px;
  }
}


/* Animasi Transisi */
/* Fade + Slide Down Animation */
.fade-slide-enter-active {
  transition: all 0.3s ease;
}
.fade-slide-leave-active {
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}


.slide-enter-active {
  animation: slide-in 0.5s ease-out;
}
.slide-leave-active {
  animation: slide-out 0.5s ease-in forwards;
}

@keyframes slide-in {
  from {
    transform: translateY(100px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(100px);
    opacity: 0;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    margin: auto;
  }
}

.logo {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.logo img {
  width: 300px;
  max-width: 90vw;
  height: auto;
  animation: fade-in-logo 1s ease-in-out;
}

@media (max-width: 600px) {
  .logo img {
    width: 300px;
  }
}

.no-result {
  padding: 12px;
  color: #999;
  text-align: center;
  font-style: italic;
}

</style>
