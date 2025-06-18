<template>
    <div class="auth-container">
      <img src="/src/assets/logo.png" class="logo" alt="EaseAble" />
      <h2>Buat Akun</h2>
      <form @submit.prevent="register">
        <input type="text" v-model="nama" placeholder="Nama Lengkap" required />
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email SSO Telkom" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
        <p class="switch">Sudah punya akun? <router-link to="/login">Login</router-link></p>
      </form>
    </div>
  </template>
  
  <script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import Swal from 'sweetalert2';
  
  const nama = ref('');
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const error = ref('');
  const router = useRouter();
  
  const register = async () => {
    try {
      if (!email.value.endsWith('@student.telkomuniversity.ac.id')) {
        Swal.fire({
          icon: 'warning',
          text: 'Gunakan email @student.telkomuniversity.ac.id',
          title: 'Gunakan email SSO Telkom University!',
          customClass: {
            popup: 'swal-custom'
          },
          confirmButtonText: 'OK'
        });
        return;
      }
  
      await axios.post('http://localhost:3000/api/auth/register', {
        nama: nama.value,
        username: username.value,
        email: email.value,
        password: password.value
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Registrasi berhasil!',
        customClass: {
          popup: 'swal-custom'
        },
        timer: 1500,
        showConfirmButton: false
      });
  
      setTimeout(() => {
        router.push('/login');
      }, 1600);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Gagal registrasi!',
        text: err.response?.data?.message || 'Terjadi kesalahan.',
        customClass: {
          popup: 'swal-custom'
        },
        confirmButtonText: 'Oke'
      });
    }
  };
  </script>
  
  
  <style scoped>
  /* Gunakan style yang sama dari LoginView.vue */
  .auth-container {
    max-width: 400px;
    margin: auto;
    padding: 2rem;
    text-align: center;
  }
  
  .logo {
    width: 200px;
    margin-bottom: -2rem;
  }
  
  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  input {
    padding: 10px;
    font-size: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .switch {
    margin-top: 10px;
    font-size: 0.9rem;
  }
  </style>
  