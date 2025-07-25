<script setup lang="ts">
    const props = defineProps<{
        profiles: Profile[];
    }>();

    const emit = defineEmits<{
        update: [];
    }>();
</script>

<template>
    <div class="main-page-content">
        <TransitionGroup name="profiles" v-if="props.profiles.length !== 0">
            <SharedProfileItem  v-for="profile in props.profiles" :profile="profile" :key="profile.id" @update="emit('update')"/>
        </TransitionGroup>
        <div class="no-profiles" v-else>
            Подходящих пользователей не найдено
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .no-profiles {
        font-family: 'Raleway';
        font-size: 17px;
        color: #7b6f6f;
        text-align: center;
    }
</style>