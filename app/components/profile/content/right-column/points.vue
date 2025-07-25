<script lang="ts" setup>
    const profileStore = useProfileStore();
</script>

<template>
    <div class="points">
        Точек: {{ profileStore.profile?.pointsCount || 0 }}
    </div>
</template>