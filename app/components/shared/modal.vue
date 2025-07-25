<script lang="ts" setup>
    const props = defineProps<{
        show: boolean;
    }>();

    const emit = defineEmits<{
        close: [];
        agree: [];
    }>();

    function agree() {
        emit('close');
        emit('agree');
    }
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>
        <div class="modal-body">
          <slot>default body</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <div class="modal__cancel" @click="emit('close')">
                Отменить
            </div>
            <div class="modal__agree" @click="agree">
                Да
            </div>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
    .modal {
        &-mask {
            position: fixed;
            z-index: 9998;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            transition: opacity 0.3s ease;
        }

        &-container {
            margin: auto;
            padding: 30px 50px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
            transition: all 0.3s ease;
            display: flex;
            flex-direction: column;
            row-gap: 20px;
            align-items: center;
            font-family: 'Raleway';
        }

        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            width: 100%;
            margin-top: 20px;
        }

        &__cancel, &__agree {
            cursor: pointer;
        }

        &__agree {
            padding: 7px 14px;
            background: red;
            color: white;
            border-radius: 7px;
        }
    }

    .modal-enter-from {
        opacity: 0;
    }

    .modal-leave-to {
        opacity: 0;
    }

    .modal-enter-from .modal-container,
        .modal-leave-to .modal-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>