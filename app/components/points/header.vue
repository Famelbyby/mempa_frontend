<script lang="ts" setup>
    const props = defineProps<{
        owner: Profile | undefined;
    }>();

    const userStore = useUserStore();
</script>

<template>
    <div class="points-header" v-if="props.owner !== undefined">
        {{ userStore.user?.id === props.owner.id ? 'Мои точки' : `Точки пользователя ${props.owner.nickname}` }}
    </div>
</template>

<style lang="scss" scoped>
    .points {
        &-header {
            font-family: 'Raleway';
            font-size: 20px;
        }
    }
</style>