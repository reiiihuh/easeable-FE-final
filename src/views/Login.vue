<template>
    <div class="auth-container">
      <img src="/src/assets/logo.png" class="logo" alt="EaseAble" />
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" v-model="username" placeholder="Username" required />
  
        <!-- Password dengan toggle -->
        <div class="password-field">
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Password"
            required
          />
          <span class="toggle-icon" @click="showPassword = !showPassword">
            <span class="material-icons">
              {{ showPassword ? 'visibility_off' : 'visibility' }}
            </span>
          </span>
        </div>
  
        <button type="submit">Login</button>
        <p class="switch">Belum punya akun? <router-link to="/register">Daftar</router-link></p>
      </form>
    </div>
  </template>
  
  
  <script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const showPassword = ref(false);

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      username: username.value,
      password: password.value
    });

    const token = response.data.token;
    const user = response.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    Swal.fire({
      icon: 'success',
      title: 'Login Berhasil!',
      showConfirmButton: false,
      timer: 1500,
      customClass: {
        popup: 'swal-custom'
      }
    });

    setTimeout(() => {
      router.push('/Homepage');
    }, 1600);
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Login Gagal',
      text: err.response?.data?.message || 'Username atau password salah.',
      confirmButtonText: 'Coba Lagi',
      customClass: {
        popup: 'swal-custom'
      }
    });
  }
};

  </script>
  
  <style scoped>
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
    width: 100%;
    box-sizing: border-box;
  }
  
  .password-field {
    position: relative;
  }
  
  .toggle-icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #9b9b9b;
  }
  
  button {
    background-color: #007bff;
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