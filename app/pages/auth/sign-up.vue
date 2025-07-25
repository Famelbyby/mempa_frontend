<script lang="ts" setup>
import { MAX_DESCRIPTION_LENGTH } from '~/utils/consts';
import { BAD_NICKNAME, EMAIL_ALREADY_EXIST, NICKNAME_ALREADY_EXIST, RESPONSE_EMAIL_ALREADY_EXIST, RESPONSE_NICKNAME_ALREADY_EXIST } from '~/utils/errors';
import { ValidateEmail, ValidatePassword } from '~/utils/validations';

    const userStore = useUserStore();

    const nickname = ref('');
    const email = ref('');
    const password = ref('');
    const repeatPassword = ref('');
    const description = ref('');

    const nicknameError = ref<string | undefined>(undefined);
    const emailError = ref<string | undefined>(undefined);
    const passwordError = ref<string | undefined>(undefined);
    const repeatPasswordError = ref<string | undefined>(undefined);

    function updateNickname(event: any) {
        const nextNickname = event.target.value as string;

        if (!ValidateNickname(nextNickname)) {
            nicknameError.value = BAD_NICKNAME;
        } else {
            nicknameError.value = undefined;
        }

        nickname.value = nextNickname;
    }

    function updateEmail(event: any) {
        const nextEmail = event.target.value as string;

        if (!ValidateEmail(nextEmail)) {
            emailError.value = BAD_EMAIL;
        } else {
            emailError.value = undefined;
        }

        email.value = nextEmail;
    }

    function updatePassword(event: any) {
        const nextPassword = event.target.value as string;

        if (!ValidatePassword(nextPassword)) {
            passwordError.value = BAD_PASSWORD;
        } else {
            passwordError.value = undefined;
        }

        password.value = nextPassword;
    }

    function updateRepeatPassword(event: any) {
        const nextPassword = event.target.value as string;

        if (!ValidatePassword(nextPassword) || password.value !== nextPassword) {
            repeatPasswordError.value = BAD_PASSWORD;
        } else {
            repeatPasswordError.value = undefined;
        }

        repeatPassword.value = nextPassword;
    }

    function updateDescription(event: any) {
        const nextDescription = event.target.value as string;

        description.value = nextDescription;
    }

    async function register() {
        if (userStore.isPending || !ValidateEmail(email.value) || !ValidatePassword(password.value) || !ValidateNickname(nickname.value) || !ValidatePassword(repeatPassword.value) || repeatPassword.value !== password.value) {
            return;
        }

        const result = await userStore.registerUser(email.value, password.value, nickname.value, description.value);

        if (result !== undefined) {
            switch (result.message) {
                case RESPONSE_NICKNAME_ALREADY_EXIST:
                    nicknameError.value = NICKNAME_ALREADY_EXIST;
                    break;
                case RESPONSE_EMAIL_ALREADY_EXIST:
                    emailError.value = EMAIL_ALREADY_EXIST;
                    break;
                case RESPONSE_BAD_EMAIL:
                    emailError.value = BAD_EMAIL;
                    break;
                case RESPONSE_EMAIL_DOESNT_EXIST:
                    emailError.value = EMAIL_DOESNT_EXIST;
                    break;
                case RESPONSE_BAD_PASSWORD:
                    passwordError.value = BAD_PASSWORD;
                    break;
                case RESPONSE_WRONG_PASSWORD:
                    passwordError.value = WRONG_PASSWORD;
            }
        }
    }

    watchEffect(async () => {
        if (userStore.user !== undefined) {
            await navigateTo('/');
        }
    });
</script>

<template>
    <div class="sign-up-page">
        <div class="sign-up-window">
            <div class="sign-up__title">
                Регистрация
            </div>
            <SharedCustomInput :disabled="userStore.isPending" label="Никнейм" type="text" placeholder="Lexa cool" :value="nickname" :error="nicknameError" @update="updateNickname" />
            <SharedCustomInput :disabled="userStore.isPending" label="Почта" type="text" placeholder="lexa@gmail.com" :value="email" :error="emailError" @update="updateEmail"/>
            <SharedCustomInput :disabled="userStore.isPending" label="Пароль" type="password" placeholder="" :value="password" :error="passwordError" @update="updatePassword"/>
            <SharedCustomInput :disabled="userStore.isPending" label="Подтвердите пароль" type="password" placeholder="" :value="repeatPassword" :error="repeatPasswordError" @update="updateRepeatPassword"/>
            <SharedDescriptionInput :max-length="MAX_DESCRIPTION_LENGTH" :value="description" @update="updateDescription" />
            <div class="sign-up__button" @click="register">Зарегистрироваться</div>
            <NuxtLink to="/auth/login" class="link-to-login__button">Уже есть аккаунт?</NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $windowBackColor: #e9e9e9;
    $acceptColor: #588157;
    $linkColor: #7706e1;

    .sign-up {
        &-page {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: center;
            padding: 10px;
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

    .link-to-login {
        &__button {
            display: flex;
            align-items: center;
            text-align: center;
            flex-direction: column;
            color: $linkColor;
            text-decoration: underline;
        }
    }
</style>