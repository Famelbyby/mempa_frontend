<script setup lang="ts">
    import type { FriendsPageMode } from '~/utils/interfaces';

    const props = defineProps<{
        mode: FriendsPageMode;
    }>();

    const emit = defineEmits<{
        setMode: [FriendsPageMode];
    }>();
</script>

<template>
    <div class="friends-header">
        <slot />
        <div class="friends-header-modes">
            <div class="friends-header__friends" :class="`item${props.mode === 'friends' ? '_active': ''}`" @click="emit('setMode', 'friends')">
                Друзья
            </div>
            <div class="friends-header__invites" :class="`item${props.mode === 'invites' ? '_active': ''}`" @click="emit('setMode', 'invites')">
                Заявки
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .friends-header {
        display: flex;
        align-items: center;
        flex-direction: column;
        row-gap: 10px;

        &-modes {
            display: flex;
            column-gap: 10px;
            font-size: 17px;
            font-family: 'Raleway';
        }
    }

    .item {
        color: inherit;
        cursor: pointer;

        &_active {
            color: green;
        }
    }
</style>