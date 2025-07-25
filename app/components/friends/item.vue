<script lang="ts" setup>
import { SharedModal } from '#components';

    const friendsStore = useFriendsStore();
    const showModal = ref(false);

    const props = defineProps<{
        friend: Friend;
    }>();

    const emit = defineEmits<{
        update: [];
    }>();

    async function addFriend() {
        const result = await friendsStore.addFriend(props.friend.id);

        if (result === undefined) {
            emit('update');
        }
    }

    async function deleteFriend() {
        const result = await friendsStore.deleteFriend(props.friend.id);

        if (result === undefined) {
            emit('update');
        }
    }
</script>

<template>
    <div class="friend-item">
        <SharedProfileItem :profile="friend"/>
        <div class="friend__delete-button" v-if="friend.isFriend" @click="showModal = true">
            Удалить из друзей
        </div>
        <div class="friend__add-button" v-else @click="addFriend">
            Добавить в друзья
        </div>
        <Teleport to="body">
            <SharedModal :show="showModal" @close="showModal = false" @agree="deleteFriend">
                Вы уверены, что хотите удалить {{ props.friend.nickname }} из друзей?
            </SharedModal>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
    .friend {
        &-item {
            display: flex;
            column-gap: 14px;
            align-items: center;
        }

        &__delete-button {
            background-color: red;
        }

        &__add-button {
            background-color: green;
        }

        &__delete-button, &__add-button {
            color: white;
            padding: 7px;
            border-radius: 10px;
            font-family: 'Raleway';
            font-size: 14px;
            cursor: pointer;
        }
    }
</style>