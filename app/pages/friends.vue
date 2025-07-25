<script setup lang="ts">
import { useFriendsStore } from '~/stores/friends.store';
import type { Friend, FriendsPageMode } from '~/utils/interfaces';

    const friendsStore = useFriendsStore();
    const userStore = useUserStore();

    const mode = ref<FriendsPageMode>('friends');
    const nickname = ref('');

    watchEffect(async () => {
        if (!userStore.isFetched) {
            return;
        }

        if (userStore.user === undefined) {
            await navigateTo('/auth/login');
            return;
        }

        update();
    });

    watchEffect((onCleanup) => {
        onCleanup(() => {
            friendsStore.resetFriends();
            friendsStore.resetInvites();
        });
    });

    async function update() {
        switch (mode.value) {
            case 'friends':
                await friendsStore.getFriends(nickname.value);
                break;
            case 'invites':
                await friendsStore.getInvites(nickname.value);
        }
    }

    function setMode(nextMode: FriendsPageMode) {
        mode.value = nextMode;
    }
</script>

<template>
    <div class="friends-page">
        <template v-if="userStore.isFetched">
            <FriendsHeader :mode="mode" @set-mode="setMode">
                <SharedSearchingField v-model="nickname" placeholder="Никнейм пользователя"/>
            </FriendsHeader>
            <FriendsContent :mode="mode" :friends="mode === 'friends' ? friendsStore.friends.map((fr: Friend) => { return {...fr, isFriend: true} }) : friendsStore.invites" @update="update"/>
        </template>
        <SharedSpinner v-else />
    </div>
</template>

<style lang="scss" scoped>
    .friends {
        &-page {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 20px 40px;
            gap: 20px;
            align-items: center;
            overflow: hidden;
        }
    }
</style>