<script setup lang="ts">
    import { SharedSearchingField, SharedProfileItem } from '#components';
    import { useMainStore } from '~/stores/main.store';

    const mainStore = useMainStore();
    const query = ref('');

    await updateProfiles();

    watchEffect(() => {
        updateProfiles();
    });

    async function updateProfiles() {
        await mainStore.getProfiles(query.value);
    }

    watchEffect((onCleanup) => {
        onCleanup(() => {
            mainStore.resetProfiles();
        });
    });
</script>

<template>
    <div class="main-page">
        <SharedSearchingField v-model="query" placeholder="Никнейм"/>
        <MainPageContent :profiles="mainStore.profiles" @update="updateProfiles" />
    </div>
</template>

<style lang="scss" scoped>
    .main {
        &-page {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 20px 40px;
            gap: 20px;
            overflow: hidden;
            align-items: center;

            &-content {
                display: flex;
                flex-direction: column;
                row-gap: 20px;
                overflow-y: scroll;
                max-width: 50%;
                min-width: 50%;
                padding: 0 20px;
                align-items: center;
            }
        }
    }
</style>