<script setup lang="ts">
  import './index.scss';
  import { useUserStore } from './stores/user.store';

  const userStore = useUserStore();

  userStore.getBySession();
</script>

<template>
  <div class="root">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>