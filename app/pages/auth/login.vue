<script lang="ts" setup>
import { ValidateEmail, ValidatePassword } from '~/utils/validations';

    const userStore = useUserStore();

    const email = ref('');
    const password = ref('');
    const emailError = ref<string | undefined>(undefined);
    const passwordError = ref<string | undefined>(undefined);

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

    async function login() {
        if (userStore.isPending || !ValidateEmail(email.value) || !ValidatePassword(password.value)) {
            return;
        }

        const result = await userStore.loginUser(email.value, password.value);

        console.log(result);

        if (result !== undefined) {
            switch (result.message) {
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
    <div class="login-page">
        <div class="login-window">
            <div class="login__title">
                Вход
            </div>
            <SharedCustomInput :disabled="userStore.isPending" label="Почта" type="text" placeholder="lexa@gmail.com" :value="email" :error="emailError" @update="updateEmail"/>
            <SharedCustomInput :disabled="userStore.isPending" label="Пароль" type="password" placeholder="" :value="password" :error="passwordError" @update="updatePassword"/>
            <div class="login__login-button" @click="login">Войти</div>
            <NuxtLink to="/auth/sign-up" class="link-to-sign__button">
                Нет аккаунта?
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $windowBackColor: #e9e9e9;
    $acceptColor: #588157;
    $linkColor: #7706e1;

    .login {
        &-page {
            display: flex;
            flex-direction: column;
            width: 100%;
            align-items: center;
            justify-content: center;
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
        }

        &__login-button {
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

        &__title {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 19px;
        }
    }

    .link-to-sign {
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