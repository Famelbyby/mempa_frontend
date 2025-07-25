<script setup lang="ts">
import { NuxtLink } from '#components';

    const location = useRoute();
    const userStore = useUserStore();

    async function navigateToPoints() {
        if (userStore.user === undefined) {
            await navigateTo('/auth/login');
        } else {
            await navigateTo(`/points/${userStore.user.id}`);
        }
    }
</script>

<template>
    <div class="sidebar">
        <div class="sidebar-item" :class="location.path.startsWith('/friends') ? ' sidebar-item_active' : ''">
            <NuxtLink :to="'/friends'">Друзья</NuxtLink>
        </div>
        <div @click="navigateToPoints" class="sidebar-item" :class="location.path.startsWith('/points') ? ' sidebar-item_active' : ''">
            Точки
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $color: white;
    $padding: 10px;
    $secondColor: green;

    .sidebar {
        display: flex;

        &-item {
            color: black;
            font-size: 16px;
            padding: 0 5px;
            transition: 0.2s;
            cursor: pointer;

            &:not(:last-child) {
                border-right: 1px solid;
            }

            &_active {
                color: $secondColor;
            }

            &:hover {
                color: $secondColor;
            }
        }
    }
</style>