<script setup lang="ts">
    const model = defineModel();
    const props = defineProps<{
        placeholder?: string,
    }>();
</script>

<template>
    <div class="searching-field">
        <input type="text" v-model="model" class="searching-field__input" :placeholder="props.placeholder || ''"/>
    </div>
</template>

<style lang="scss" scoped>
    .searching-field {
        display: flex;
        justify-content: center;

        &__input {
            padding: 5px;
            border-radius: 11px;
            border: 1px solid #7b6f6f;
            font-family: 'Raleway';
            font-size: 13px;
            max-width: 300px;
            min-width: 300px;

            &:focus-visible {
                outline: none;
            }
        }
    }
</style>