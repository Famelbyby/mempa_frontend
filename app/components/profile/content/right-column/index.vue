<script setup lang="ts">
    const profileStore = useProfileStore();
    const userStore = useUserStore();
</script>

<template>
    <div class="right-column">
        <ProfileContentRightColumnPoints />
        <div class="right-column-is-friend" v-if="profileStore.profile?.id !== userStore.user?.id && userStore.user !== undefined">
            <div class="right-column__not-friend" v-if="!profileStore.profile?.isFriend">
                не в друзьях
            </div>
            <div class="right-column__friend" v-else>
                в друзьях с
                <div class="right-column__friend-since">
                    {{ FormatToFullDate(+(profileStore.profile.friendSince || 0)) }}
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .right-column {
        display: flex;
        flex-direction: column;
        row-gap: 25px;
        padding: 10px 0;

        &__not-friend {
            color: #d30303;
        }
        
        &__friend {
            color: green;
        }
    }
</style>