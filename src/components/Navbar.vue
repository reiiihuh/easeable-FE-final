<template>
  <div class="navbar">
    <!-- Logo EaseAble -->
    <div class="logo">
      <img src="/src/assets/logo.png" alt="EaseAble" />
    </div>

    <div class="right-icons">
      <!-- Notifikasi -->
      <div class="notif-container" @click="toggleNotif">
        <span class="material-icons icon notification">notifications</span>

      <!-- Dropdown Notifikasi -->
      <transition name="fade">
        <div v-if="showNotif" class="dropdown notif-dropdown">
          <p class="notif-title">Notifikasi</p>
          <hr />
          <div v-if="notifications.length">
            <div v-for="(notif, index) in notifications" :key="index" class="notif-item">
              <p class="respon"><strong>{{ notif.jenis_laporan }}</strong>: {{ notif.deskripsi_feedback}}</p>
              <p class="respon"><strong>Respon Admin</strong>: {{ notif.respon_admin }}</p>
              <p class="time">{{ formatDate(notif.tanggal_respon) }}</p>
              <hr v-if="index !== notifications.length - 1" />
            </div>
          </div>
          <p v-else class="notif-empty">Belum ada notifikasi</p>
        </div>
      </transition>
    </div>


      <!-- Profile Dropdown -->
      <div class="profile-container" @click="toggleDropdown">
        <span class="material-icons icon">account_circle</span>

        <transition name="fade">
          <div v-if="showDropdown" class="dropdown">
            <p class="name">{{ user.name }}</p>
            <p class="email">{{ user.email }}</p>
            <hr />
            <button class="logout-btn" @click="logout">
              <span class="material-icons">logout</span> Logout
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

  
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

const showDropdown = ref(false);
const showNotif = ref(false);
const user = ref({
  name: '',
  email: '',
});
const notifications = ref([]);

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    user.value = userData;
    fetchNotifications(userData.id_mahasiswa);
  }
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  showNotif.value = false;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function toggleNotif() {
  showNotif.value = !showNotif.value;
  showDropdown.value = false;
}

function logout() {
  localStorage.clear();
  location.href = '/login';
}

async function fetchNotifications(id) {
  try {
    const res = await axios.get(`http://localhost:3000/api/notifikasi/${id}`);
    notifications.value = res.data;
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal memuat notifikasi',
      text: 'Silakan coba lagi nanti.',
      customClass: {
        popup: 'swal-custom'
      }
    });
  }
}
</script>
  
<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: #fff;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.logo img {
  height: 120px;
  object-fit: contain;
}

.right-icons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.icon {
  font-size: 28px;
  cursor: pointer;
  color: #000;
}

  
  .icon {
    font-size: 30px;
    color: #000;
    cursor: pointer;
  }
  
  .profile-container {
    position: relative;
  }
  
  .dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    background: #fff;
    padding: 12px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    width: 220px;
    z-index: 1000;
    animation: fadeIn 0.2s ease-in-out;
    border: solid 1px #6b6b6b;
  }
  
  .name {
    font-weight: 600;
  }
  
  .email {
  font-size: 10px;
  color: #444;
  margin-bottom: 8px;
  word-break: break-word; /* biar email panjang pecah baris */
  white-space: normal;     /* bisa turun baris */
  line-height: 1.3;
}

  
  .logout-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #d00;
    font-weight: 700;
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.2s ease;
  }
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .navbar {
      padding: 10px 14px;
    }
  
    .dropdown {
      width: 180px;
    }
  }

  .notif-container {
  position: relative;
}

.notif-dropdown {
  max-height: 300px;
  overflow-y: auto;
}

.notif-item {
  margin-bottom: 6px;
}

.respon {
  font-size: 13px;
  color: #333;
  margin-bottom: 4px;
  word-wrap: break-word;
  white-space: pre-wrap;
}

.time {
  font-size: 11px;
  color: #888;
}


  </style>
  