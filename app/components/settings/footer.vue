<script setup lang="ts">
    const emit = defineEmits<{
        reject: [];
        save: [];
    }>();
</script>

<template>
    <div class="settings-footer">
        <div class="settings-footer__reject" @click="emit('reject')">
            Отменить
        </div>
        <div class="settings-footer__save" @click="emit('save')">
            Сохранить
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .settings-footer {
        display: flex;
        justify-content: space-around;
        align-items: center;

        &__reject {
            cursor: pointer;
        }

        &__save {
            color: white;
            background: green;
            padding: 6px;
            cursor: pointer;
            border-radius: 6px;
        }
    }
</style>