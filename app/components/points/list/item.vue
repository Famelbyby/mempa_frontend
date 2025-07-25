<script setup lang="ts">
    const props = defineProps<{
        point: Point;
    }>();

    const emit = defineEmits<{
        remove: [string];
    }>();

    const showModal = ref(false);
</script>

<template>
    <div class="point-item" :id="`point-${props.point.id}`">
        <div class="point-avatar">
            <img class="point-avatar__img" :src="'/default-point.png'" alt="" />
        </div>
        <div class="point-content">
            <div class="point-header">
                <div class="point-header__name">
                    {{ props.point.name }}
                </div>
                <div class="point-header__rating">
                    Оценка: {{ props.point.rating }}
                </div>
            </div>
            <div class="point-footer">
                <div class="point__review">
                    {{ props.point.review }}
                </div>
                <div class="point__created-at">
                    создана {{ FormatToFullDate(+props.point.createdAt) }}
                </div>
            </div>
        </div>
        <div class="point__remove" @click="showModal = true">
            Удалить
        </div>
        <Teleport to="body">
            <SharedModal :show="showModal" @close="showModal = false" @agree="emit('remove', props.point.id)">
                Вы уверены, что хотите удалить точку?
            </SharedModal>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
    .point {
        &-item {
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-evenly;
            border: 1px solid #929292;
            border-radius: 10px;
            padding: 0 7px;
            font-family: 'Raleway';
        }
        
        &-avatar {
            &__img {
                width: 40px;
                height: 40px;
            }
        }

        &-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            padding: 8px 15px;
            row-gap: 10px;
        }

        &-header {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &__name {
                font-size: 20px;
            }
        }

        &-footer {
            display: flex;
            flex-direction: column;
            row-gap: 6px;
        }

        &__review {
            min-height: 45px;
            background: #f4f4f4;
            padding: 5px;
            border-radius: 5px;
        }

        &__remove {
            background-color: red;
            color: white;
            padding: 8px 6px;
            border-radius: 5px;
            cursor: pointer;
        }

        &__created-at {
            font-size: 13px;
            color: #6f6f6f;
        }
    }
</style>