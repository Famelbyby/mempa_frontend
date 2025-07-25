<script lang="ts" setup>
    const profileStore = useProfileStore();
</script>

<template>
    <div class="profile-header">
        <div class="profile-brief">
            <div class="profile-brief__nickname">
                {{ profileStore.profile!.nickname }}
            </div>
            <div class="profile-brief__created-at">
                {{ FormatToFullDate(+profileStore.profile!.createdAt) }}
            </div>
        </div>
        <div class="profile-avatar">
            <img class="profile-avatar__img" :src="`/default-avatar.png`">
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $dullColor: #949494;

    .profile {
        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            min-width: 40%;
        }

        &-brief {
            font-family: 'Raleway';
            display: flex;
            flex-direction: column;
            row-gap: 13px;

            &__nickname {
                font-size: 25px;
            }

            &__created-at {
                color: $dullColor;
            }
        }

        &-avatar {
            &__img {
                width: 100px;
                height: 100px;
                border-radius: 50%;
            }
        }
    }
</style>