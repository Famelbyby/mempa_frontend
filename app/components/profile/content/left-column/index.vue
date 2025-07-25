<script setup lang="ts">
import { NuxtLink } from '#components';

    const profileStore = useProfileStore();
    const userStore = useUserStore();
    const friendsStore = useFriendsStore();
    
    const showModal = ref(false);

    async function addFriend() {
        if (profileStore.profile === undefined || userStore.user === undefined) {
            return;
        }

        const result = await friendsStore.addFriend(profileStore.profile.id);

        if (result === undefined) {
            profileStore.getProfile(profileStore.profile.id, userStore.user.id);
        }
    }

    async function deleteFriend() {
        if (profileStore.profile === undefined || userStore.user === undefined) {
            return;
        }

        const result = await friendsStore.deleteFriend(profileStore.profile.id);

        if (result === undefined) {
            profileStore.getProfile(profileStore.profile.id, userStore.user.id);
        }
    }
</script>

<template>
    <div class="left-column">
        <ProfileContentLeftColumnDescription />
        <NuxtLink class="left-coumn__settings" to="/settings" v-if="userStore.user?.id === profileStore.profile?.id">
            Настройки
        </NuxtLink>
        <div class="left-column-friend-management" v-else>
            <div class="left-column__add-friend" v-if="!profileStore.profile?.isFriend" @click="addFriend">
                Добавить в друзья
            </div>
            <div class="left-column__delete-friend" v-else @click="showModal = true">
                Удалить из друзей
            </div>
            <Teleport to="body">
            <SharedModal :show="showModal" @close="showModal = false" @agree="deleteFriend">
                Вы уверены, что хотите удалить {{ profileStore.profile?.nickname || '' }} из друзей?
            </SharedModal>
        </Teleport>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .left-column {
        display: flex;
        flex-direction: column;
        row-gap: 30px;

        &__delete-friend {
            background-color: red;
        }

        &__add-friend {
            background-color: green;
        }

        &-friend-management {
            display: flex;
        }

        &__delete-friend, &__add-friend {
            padding: 10px;
            color: white;
            border-radius: 7px;
            cursor: pointer;
            transition-duration: 0.2s;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
</style>