<script lang="ts" setup>
    import { FormatToFullDate } from '~/utils/formats';

    const props = defineProps<{
        profile: Profile,
    }>();

    const emit = defineEmits<{
        update: [],
    }>();

    const friendsStore = useFriendsStore();
    const userStore = useUserStore();

    async function addFriend() {
        const result = await friendsStore.addFriend(props.profile.id);

        if (result === undefined) {
            emit('update');
        }
    }

    async function clickedOnProfileItem() {
        await navigateTo(`/profile/${props.profile.id}`);
    }
</script>

<template>
    <div class="profile-link" @click="clickedOnProfileItem">
        <div class="profile-item">
            <div class="profile-avatar">
                <img class="profile-avatar__img" :src="'/default-avatar.png'" alt="avatar" />
            </div>
            <div class="profile-description">
                <div class="profile-header">
                    <div class="profile-name">
                        {{ props.profile.nickname }}
                    </div>
                    <div class="profile-created">
                        зарегистрирован {{ FormatToFullDate(+props.profile.createdAt) }}
                    </div>
                </div>
                <div class="profile-footer">
                    <div class="profile-points">
                        точек: {{  props.profile.pointsCount || 0 }}
                    </div>
                    <div class="profile__not-friend" v-if="!props.profile.isFriend && userStore.user !== undefined && userStore.user.id !== props.profile.id" @click="(event: any) => {
                        event.stopPropagation();

                        addFriend();
                    }">
                        добавить в друзья
                    </div>
                    <template v-else-if="userStore.user !== undefined">
                        <div class="profile__friend">
                            в друзьях
                        </div>
                        <div class="profile-friend-since">
                            с {{ FormatToFullDate(+(props.profile.friendSince || 0)) }}
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $secondColor: green;

    .profile {
        &-name {
            cursor: pointer;
            transition-duration: 0.2s;

            &:hover {
                color: $secondColor;
            }
        }

        &-link {
            width: 100%;
            display: flex;
        }

        &__friend {
            color: $secondColor;
        }

        &__not-friend {
            color: $secondColor;
            cursor: pointer;
        }

        &-item {
            display: flex;
            padding: 20px;
            border: 1px solid #7b6f6f;
            border-radius: 10px;
            align-items: center;
            font-family: 'Raleway';
            column-gap: 6px;
            flex-grow: 1;
        }

        &-avatar {
            &__img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
            }
        }

        &-description {
            display: flex;
            flex-direction: column;
            width: 100%;
            row-gap: 8px;
        }

        &-header, &-footer {
            display: flex;
            justify-content: space-between;
        }
    }
</style>