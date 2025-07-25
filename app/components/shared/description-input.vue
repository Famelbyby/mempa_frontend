<script setup lang="ts">
    const props = defineProps<{
        value: string;
        maxLength: number;
    }>();

    const emit = defineEmits<{
        update: [Event];
    }>();
</script>

<template>
    <div class="description">
        Описание
        <textarea class="description__textarea" :value="props.value" @input="emit('update', $event)" :maxlength="props.maxLength" placeholder="Описание" />
    </div>
</template>

<style lang="scss" scoped>
    .description {
        display: flex;
        flex-direction: column;
        row-gap: 6px;

        &__textarea {
            padding: 5px;
            border-radius: 11px;
            border: 1px solid #7b6f6f;
            font-family: "Raleway";
            font-size: 13px;
            resize: none;
            height: 100px;

            &:focus-visible {
                outline: none;
            }
        }
    }
</style>