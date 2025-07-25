<script lang="ts" setup>
import { BAD_NICKNAME, NICKNAME_ALREADY_EXIST, RESPONSE_NICKNAME_ALREADY_EXIST } from '~/utils/errors';

    const userStore = useUserStore();

    const nickname = ref('');
    const description = ref('');

    const nicknameError = ref<string | undefined>(undefined);

    function updateNickname(event: any) {
        const nextNickname = event.target.value as string;

        if (!ValidateNickname(nextNickname)) {
            nicknameError.value = BAD_NICKNAME;
        } else {
            nicknameError.value = undefined;
        }

        nickname.value = nextNickname;
    }

    function updateDescription(event: any) {
        const nextDescription = event.target.value as string;

        description.value = nextDescription;
    }

    async function updateUser() {
        if (userStore.isPending || !ValidateNickname(nickname.value) || !userStore.user) {
            return;
        }

        const result = await userStore.updateUser({nickname: nickname.value, description: description.value});

        if (result !== undefined) {
            switch (result.message) {
                case RESPONSE_NICKNAME_ALREADY_EXIST:
                    nicknameError.value = NICKNAME_ALREADY_EXIST;
                    break;
            }
        } else {
            await navigateTo(`/profile/${userStore.user.id}`);
        }
    }

    watchEffect(async () => {
        if (!userStore.isFetched) {
            return;
        }

        if (userStore.user === undefined) {
            await navigateTo('/auth/login');
        } else {
            nickname.value = userStore.user.nickname;
            description.value = userStore.user.description;
        }
    });

    async function reject() {
        if (userStore.user !== undefined) {
            await navigateTo(`/profile/${userStore.user?.id}`)
        }
    }
</script>

<template>
    <div class="settings-page">
        <template v-if="userStore.isFetched">
            <div class="settings-window">
                <div class="settings__title">
                    Настройки
                </div>
                <SharedCustomInput :disabled="userStore.isPending" label="Никнейм" type="text" placeholder="Lexa cool" :value="nickname" :error="nicknameError" @update="updateNickname" />
                <SharedDescriptionInput :max-length="500" :value="description" @update="updateDescription" />
                <SettingsFooter @reject="reject" @save="updateUser"/>
            </div>
            <div class="nothing"></div>
        </template>
        <SharedSpinner v-else />
    </div>
</template>

<style lang="scss" scoped>
    $windowBackColor: #e9e9e9;
    $acceptColor: #588157;

    .settings {
        &-page {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: center;
            padding: 10px;
            display: flex;
            flex-grow: 1;
        }

        &-window {
            row-gap: 20px;
            font-family: 'Raleway';
            font-size: 16px;
            background-color: $windowBackColor;
            max-width: 220px;
            min-width: 220px;
            display: flex;
            flex-direction: column;
            padding: 20px;
            border-radius: 10px;
            align-items: stretch;
            overflow-y: scroll;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &__title {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 19px;
        }

        &__button {
            border: 1px solid;
            padding: 8px 20px;
            border-radius: 7px;
            color: $acceptColor;
            transition-duration: 0.2s;
            cursor: pointer;
            margin: 0 auto;

            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .nothing {
        display: none;
    }
</style>