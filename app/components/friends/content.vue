<script setup lang="ts">
    import { TransitionGroup } from 'vue';
    import ProfileItem from '../shared/profile-item.vue';

    const props = defineProps<{
        mode: FriendsPageMode;
        friends: Friend[];
    }>();

    const emit = defineEmits<{
        update: [];
    }>();
</script>

<template>
    <div class="content">
        <TransitionGroup name="friends" v-if="friends.length !== 0">
            <FriendsItem v-for="friend in friends" :friend="friend" @update="emit('update')" :key="friend.id"/>
        </TransitionGroup>
        <div v-else class="no-friends">
            {{ props.mode === 'friends' ? 'Друзей нет' : 'Заявок нет' }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .content {
        display: flex;
        flex-direction: column;
        row-gap: 20px;
        overflow-y: scroll;
        padding: 0 20px;
        max-width: 50%;
        min-width: 50%;
    }

    .friends {
        &-move, &-enter-active, &-leave-active {
            transition: all 0.5s ease;
        }

        &-enter-from, &-leave-to {
            opacity: 0;
            transform: translateX(40px);
        }

        &-leave-active {
            position: absolute;
        }
    }

    .no-friends {
        font-family: "Raleway";
        font-size: 17px;
        color: #7b6f6f;
        text-align: center;
    }
</style>