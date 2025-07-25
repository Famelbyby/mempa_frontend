<script setup lang="ts">
    import { PointsMap, PointsList, SharedSpinner } from '#components';
    import NotFound from '~/components/shared/not-found.vue';
import type { LatLng } from '~/utils/interfaces';

    const pointsStore = usePointsStore();
    const userStore = useUserStore();
    const location = useRoute();
    const id = (location.params.id || '') as string;

    const initMarkerPos: LatLng = {
        lat: 55.75155956879236,
        lng: 37.62404273408656,
    };
    
    const markerPos = ref<LatLng>(initMarkerPos);

    watchEffect(async () => {
        if (id === '') {
            await navigateTo('/');
        }

        if (userStore.user === undefined) {
            return;
        }

        const result = await pointsStore.getPoints(userStore.user.id);

        if (result !== undefined) {
            pointsStore.error = result.status;
            return;
        }

        if (id === userStore.user.id) {
            pointsStore.owner = userStore.user;
        } else {
            const result = await pointsStore.getOwner(id);

            if (result !== undefined) {
                pointsStore.error = result.status;
            }
        }
    });

    function clickedPoint(id: string) {
        const point = document.getElementById(`point-${id}`);

        if (point !== null) {
            point.scrollIntoView({
                behavior: 'smooth'
            });;
        }
    }

    function movedMarker(event: any) {
        markerPos.value = {...event.latlng as LatLng};
    }

    function resetMarker() {
        markerPos.value = initMarkerPos;
    }
</script>

<template>
    <div class="points-page">
        <template v-if="userStore.isFetched">
            <PointsHeader :owner="pointsStore.owner"/>
            <PointsMap :markerPos="markerPos" :points="pointsStore.points" @clickedPoint="clickedPoint" @movedMarker="movedMarker"/>
            <PointsAddForm :markerPos="markerPos" @resetMarker="resetMarker"/>
            <PointsList />
        </template>
        <SharedSpinner v-else-if="pointsStore.error === undefined" />
        <NotFound v-else />
    </div>
</template>

<style lang="scss" scoped>
    .points {
        &-page {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            align-items: center;
            padding: 20px;
            row-gap: 18px;
            overflow-y: scroll;
        }
    }
</style>