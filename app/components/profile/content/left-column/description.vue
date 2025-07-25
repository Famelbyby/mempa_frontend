<script setup lang="ts">
    const profileStore = useProfileStore();
</script>

<template>
    <div class="description">
        <div class="description__title">
            О себе
        </div>
        <div class="description__content">
            {{ profileStore.profile?.description || 'тут пусто...' }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $dullColor: #595959;

    .description {
        display: flex;
        flex-direction: column;
        row-gap: 10px;
        flex-grow: 1;

        &__title {
            font-size: 20px;
        }

        &__content {
            max-width: 300px;
            min-width: 300px;
            border: 2px solid $dullColor;
            border-radius: 10px;
            height: 90px;
            padding: 6px;
            box-sizing: border-box;
            font-size: 14px;
            color: $dullColor;
        }
    }
</style>