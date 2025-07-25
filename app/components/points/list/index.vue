<script setup lang="ts">
    const pointsStore = usePointsStore();
    const userStore = useUserStore();

    async function removePoint(pointId: string) {
        if (userStore.user === undefined) {
            return;
        }

        const result = await pointsStore.deletePoint(userStore.user.id, pointId);

        if (result === undefined) {
            pointsStore.getPoints(userStore.user.id);
        }
    }
</script>

<template>
    <div class="points-list">
        <TransitionGroup name="points" v-if="pointsStore.points.length !== 0">
            <PointsListItem v-for="point in pointsStore.points" :key="point.id" :point="point" @remove="removePoint"/>
        </TransitionGroup>
        <div class="no-points" v-else >
            Точек нет
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .points-list {
        display: flex;
        flex-direction: column;
        min-width: 530px;
        row-gap: 10px;
    }

    .points {
        &-enter-active, &-leave-active {
            transition: all 0.5s ease;
        }

        &-enter-from, &-leave-to {
            opacity: 0;
            transform: translateX(40px);
        }
    }

    .no-points {
        font-family: "Raleway";
        font-size: 17px;
        color: #7b6f6f;
        text-align: center;
    }
</style>