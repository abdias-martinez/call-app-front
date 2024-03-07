<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script setup>
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

onBeforeMount(() => {
  const token = localStorage.getItem('jwt');

  if (token) {
    try {
      router.push('/dashboard');
    } catch (error) {
      localStorage.removeItem('jwt');
      router.push('/login');
    }
  } else {
    router.push('/login');
  }
});
</script>


<style scoped>
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100vh;
  font-family: 'Arial', sans-serif;
  background: #1f2d52;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>