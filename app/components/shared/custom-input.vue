<script setup lang="ts">
    const props = defineProps<{
        value: string;
        type: string;
        error: string | undefined;
        placeholder: string;
        label: string;
        disabled: boolean;
    }>();

    const emit = defineEmits<{
        update: [Event];
    }>();
</script>

<template>
    <div class="custom-input">
        <div class="custom-input__label">{{ props.label }}</div>
        <input class="custom-input__field" :disabled="props.disabled" :type="props.type" :placeholder="placeholder" :value="props.value" @input="emit('update', $event)"/>
        <div class="input-error" v-if="props.error !== undefined">
            {{ props.error }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .custom-input {
        display: flex;
        flex-direction: column;
        row-gap: 6px;

        &__field {
            padding: 5px;
            border-radius: 11px;
            border: 1px solid #7b6f6f;
            font-family: 'Raleway';
            font-size: 13px;

            &:focus-visible {
                outline: none;
            }
        }
    }

    .input-error {
        color: #d30303;
        font-size: 12px;
    }
</style>