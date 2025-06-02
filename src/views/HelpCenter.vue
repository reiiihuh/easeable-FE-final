<template>
  <div class="help-container">
    <!-- Logo -->
    <div class="logo">
      <img src="/src/assets/logo.png" alt="easeable">
    </div>

    <!-- Header -->
    <div class="header">
      <h2>Butuh bantuan?<br>berikan kami pesan mu!</h2>
      <p>* indicates required field.</p>
    </div>

    <!-- Form -->
    <div class="form">
      <label for="category">Pilih kategori*</label>
      <select v-model="category" id="category">
        <option value="" disabled>Pilih kategori</option>
        <option value="Saran">Saya punya saran</option>
        <option value="Masalah">Saya mengalami kendala</option>
      </select>

      <label for="comment">Berikan kami masukan!*</label>
      <textarea v-model="comment" id="comment" placeholder="Berikan komentar*"></textarea>

      <!-- Buttons -->
      <button class="submit-button" @click="submitFeedback">Submit</button>
      <button class="back-button" @click="goBack">Kembali</button>
    </div>

    <!-- Custom Alert -->
    <transition name="fade">
      <div v-if="showAlert" class="custom-alert">
        Terima kasih atas feedbacknya!
      </div>
    </transition>

    <!-- Supported By -->
    <div class="supported-by">
      <p>Supported by :</p>
      <div class="logo-container">
        <img src="../assets/logo fit.png" alt="Fakultas Ilmu Terapan">
        <img src="../assets/logosc.png" alt="Smart City">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const category = ref('');
const comment = ref('');
const showAlert = ref(false);  // Untuk menampilkan Custom Alert
const router = useRouter();
const route = useRoute();

function submitFeedback() {
  if (!category.value || !comment.value) {
    alert('Mohon lengkapi semua bidang.');
    return;
  }

  // Tampilkan Custom Alert
  showAlert.value = true;
  setTimeout(() => {
    showAlert.value = false;
    // Ambil nama ruangan dari parameter URL
    const roomName = route.params.roomName;

    if (roomName) {
      // Arahkan kembali ke slideshow dengan roomName
      router.push(`/slideshow/${encodeURIComponent(roomName)}`);
    } else {
      router.push('/Homepage');
    }
  }, 1500); // Durasi alert sebelum dialihkan
}

function goBack() {
  const roomName = route.params.roomName;
  if (roomName) {
    router.push(`/slideshow/${encodeURIComponent(roomName)}`);
  } else {
    router.push('/Homepage');
  }
}
</script>


<style scoped>
/* Animasi Transisi */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.custom-alert {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
}

/* Struktur Kontainer Utama */

.logo {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.logo img {
  width: 200px;
  max-width: 90vw;
  height: auto;
  animation: fade-in-logo 1s ease-in-out;
}

.help-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  /* min-height: 100vh; */
}

/* Judul dan Subjudul */
.header h2 {
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  top: 80px; /* Turunkan teks tanpa mempengaruhi tata letak */
}


.header p {
  font-size: 0.7rem;
  color: gray;
  position: relative;
  top: 70px;
}

/* Formulir */
.form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
  max-width: 300px;
  margin: 90px auto;
  font-size: 0.8rem;
  text-align: left;
  font-weight: bold;
}

select, textarea {
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 90%;
  font-size: 0.8rem;
  font-weight: bold;
}

textarea {
  height: 100px;
  resize: none;
}

/* Tombol */
.submit-button, .back-button {
  padding: 12px;
  color: white;
  border: none;
  border-radius: 5px;
  margin: 5px 0;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.submit-button {
  background-color: #007bff;
}

.back-button {
  background-color: #e63946;
}

/* Efek Hover */
.submit-button:hover {
  background-color: #0056b3;
}

.back-button:hover {
  background-color: #d62839;
}

/* Bagian "Supported By" */
.supported-by {
  margin-top: -60px;
}

.supported-by p {
  font-size: 14px;
  color: gray;
}

.logo-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.logo-container img {
  height: 30px;
}

/* Responsivitas */
@media (max-width: 600px) {
  .header h2 {
    font-size: 1.2rem;
  }

  .form {
    width: 90%;
  }

  .submit-button, .back-button {
    padding: 10px;
    font-size: 0.9rem;
  }

  .logo-container img {
    height: 30px;
  }
}
</style>
