<template>
    <div class="not-found">
        <div class="not-found__title">
            404
        </div>
        <div class="not-found__description">
            Not Found
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .not-found {
        display: flex;
        flex-grow: 1;
        align-items: center;
        justify-content: center;
        font-family: 'Raleway';
        row-gap: 20px;

        &__title {
            font-size: 60px;
        }

        &__description {
            font-size: 36px;
        }
    }
</style>