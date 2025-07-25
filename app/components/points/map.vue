<script setup lang="ts">
import { LMarker } from '#components';
import type { LatLng } from '~/utils/interfaces';

    const props = defineProps<{
        points: Point[];
        markerPos: LatLng;
    }>();

    const emit = defineEmits<{
        clickedPoint: [string];
        movedMarker: [any];
    }>();
</script>

<template>
    <div class="points-map">
        <LMap
            style="height: 450px; width: 100%"
            zoom="10"
            :center="[55.75155956879236, 37.62404273408656]"
            :use-global-leaflet="false"
        >
            <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
            />
            <LMarker v-for="point in props.points" :lat-lng="point.coordinates" @click="emit('clickedPoint', point.id)" :key="point.id"/>
            <LMarker :lat-lng="[props.markerPos.lat, props.markerPos.lng]" @move="(event: any) => emit('movedMarker', event)" draggable />
        </LMap>
    </div>
</template>

<style lang="scss" scoped>
    .points-map {
        display: flex;
        width: 70%;

        &__add-marker {
            background-color: red;
        }
    }
</style>