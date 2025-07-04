<template>
  <div class="slideshow-container">
    <div class="nav-info">
      <span class="material-icons nav-icon">
      {{ currentIcon }}
    </span>
  <div class="nav-text">
    <p class="direction-text">{{ currentSlide.instruction }}</p>
    <p class="distance-text">{{ currentSlide.distance }}</p>
  </div>
</div>


    <img :src="currentSlide.image" class="slideshow-image" />

    <div class="arrow left" @click="prevSlide">
      <span class="material-icons">chevron_left</span>
    </div>
    <div class="arrow right" @click="nextSlide">
      <span class="material-icons">chevron_right</span>
    </div>

    <div class="step-indicator">
      <span
        v-for="(item, index) in slideshowData"
        :key="index"
        :class="['step-dot', { active: index === currentIndex }]"
      ></span>
    </div>

    <!-- Live Preview -->
    <div class="live-preview" @click="showLivePreview = true">
      <img :src="previewImage" alt="Live Preview" />
      <div class="live-label">Live</div>
    </div>


    <!-- Route Details Overlay -->
    <RouteDetails :visible="showDetails" @close="showDetails = false" />
    
    <!-- Bottom Section -->
    <div class="bottom-panel">
      <div class="room-header">
        <span class="room-name">{{ roomName }}</span>
        <span class="details-container" @click="showDetails = true">
        <span class="material-icons">list</span>
        <span class="details-text">Details</span>
      </span>

      </div>

      <button class="exit-button" @click="showModal = true">
        Selesaikan Perjalanan
      </button>

        <!-- Pusat Bantuan dengan Transisi -->
        <div class="help-center" @click="goToHelp">
          <span class="material-icons">support_agent</span> Pusat Bantuan
        </div>
      </div>

    <!-- Custom Alert Modal -->
    <CustomAlert
      :show="showModal"
      @confirm="confirmFinish"
      @cancel="showModal = false"
    />

    <!-- Route Details Modal -->
    <RouteDetails :visible="showDetails" @close="showDetails = false" />
    <LivePreview :visible="showLivePreview" :gifUrl="currentSlide.gif" @close="showLivePreview = false" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import CustomAlert from '../components/CustomAlert.vue';
import RouteDetails from '../components/RouteDetails.vue';
import { directionIcons } from '../data/NavigationData';
import LivePreview from '../components/LivePreview.vue';


const router = useRouter();
const route = useRoute();
const currentIndex = ref(0);
const showModal = ref(false);
const showDetails = ref(false);
const showLivePreview = ref(false);
const roomName = route.params.roomName;

// Data slideshow dari backend
const slideshowData = ref([]);

// Ambil data dari backend pas mounted
onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:3000/api/slides/${encodeURIComponent(roomName)}`);
    // Mapping struktur response ke format yang digunakan di frontend
    slideshowData.value = res.data.map(item => ({
      instruction: item.deskripsi_langkah,
      image: item.url_gambar,
      gif: item.url_gif,
      direction: item.arah?.toLowerCase() || 'help_outline',
      distance: item.jarak || '' // kalau kamu nanti tambahkan kolom jarak
    }));
  } catch (err) {
    console.error('Gagal ambil data slideshow:', err);
  }
});

const currentSlide = computed(() => slideshowData.value[currentIndex.value] || {});

const currentIcon = computed(() => {
  const dir = currentSlide.value?.direction;
  return directionIcons[dir] || 'navigation';
});

const previewImage = computed(() => {
  const gifUrl = currentSlide.value?.gif || '';
  if (!gifUrl) return '';
  return gifUrl.replace('/upload/', '/upload/pg_1/');
});


function nextSlide() {
  if (currentIndex.value < slideshowData.value.length - 1) {
    currentIndex.value++;
  }
}
function prevSlide() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}
function confirmFinish() {
  showModal.value = false;
  router.push('/Homepage');
}
function goToHelp() {
  router.push(`/help/${encodeURIComponent(roomName)}`);
}
</script>

  
<style scoped>
  .slideshow-container {
    position: fixed;
    inset: 0;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;
  }
  
  .slideshow-image {
    width: 100%;
    height: 85%;
    object-fit: cover;
    position: absolute;
  }
  
  .nav-info {
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #0c7b53;
  color: white;
  padding: 20px 30px;
  border-radius: 12px;
  z-index: 2;
  font-size: 14px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: flex-start; /* KUNCI: biar icon & teks mulai dari atas */
  gap: 15px;
  width: 80%;
  flex-wrap: wrap;
  word-break: break-word;
  overflow-wrap: break-word;
  text-align: left;
}

.nav-icon {
  font-size: 32px;
  flex-shrink: 0; /* KUNCI: biar icon gak ikut ngecil kalau space sempit */
  margin-top: 2px; /* biar lebih sejajar pas teks 2 baris */
}

.nav-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1; /* KUNCI: biar teks bisa ambil space sisa */
  min-width: 0;
}

.direction-text,
.distance-text {
  margin: 0;
  font-size: 18px;
}
  
  .arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 32px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

  .arrow:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }

  .arrow.left {
    left: 10px;
  }

  .arrow.right {
    right: 10px;
  }

  .arrow span {
    font-size: 40px;
  }
  
  .step-indicator {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 500px;
    z-index: 2;
    /* background: #9c9c9c; */
    width: 50%;
    padding: 3px 0;
    border-radius: 8px;
  }

  .step-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ccc; /* abu-abu */
    transition: background-color 0.3s;
  }

  .step-dot.active {
    background-color: white; /* aktif */
  }

  
  .live-preview {
    position: absolute;
    bottom: 150px;
    right: 10px;
    z-index: 3;
    width: 70px;
    height: 70px;
    border-radius: 12px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
  .live-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .live-label {
    position: absolute;
    bottom: 3px;
    left: 5px;
    font-size: 12px;
    font-weight: bold;
    color: white;
    text-shadow: 0 0 3px black;
  }
  
  .bottom-panel {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: white;
    padding: 15px 20px;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .room-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 10px;
    margin-left: 3rem; /*nama ruangan*/
  }
  .room-name {
    color: #000;
  }
  .details-label {
    font-size: 14px;
    color: #888;
  }
  
  .exit-button {
    width: 90%;
    padding: 12px 0;
    background: red;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .help-center {
    display: inline-flex;
    align-items: center;
    font-size: 12px;
    gap: 4px;
    margin-left: 8px;
    color: red;
    font-weight: bold;
  }

  .details-container {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: 10px;
}

.details-container .material-icons {
  color: #9a9a9a;
  font-size: 20px;
}

.details-text {
  margin-right: 3rem;
  font-size: 14px;
  color: #9a9a9a;
}
</style>
  