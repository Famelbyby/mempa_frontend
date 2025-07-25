<script setup lang="ts">
import { NuxtLink } from '#components';

    const userStore = useUserStore();
    const pointsStore = usePointsStore();
    const profilesStore = useProfileStore();

    async function logout() {
        const result = await userStore.logout();

        if (result === undefined) {
            pointsStore.resetPoints();
            profilesStore.resetProfile();

            await navigateTo('/auth/login');
        }
    }
</script>

<template>
    <div class="profile">
        <div v-if="userStore.user !== undefined" class="profile-avatar">
            <NuxtLink :to="`/profile/${userStore.user.id}`">
                <img class="profile-avatar__img" width="50px" height="50px" :src="'/default-avatar.png'" />
            </NuxtLink>
            <div class="profile-avatar__logout" @click="logout">
                Выйти
            </div>
        </div>
        
        <div v-else class="profile-login-buttons">
            <NuxtLink to="/auth/login">
                <div class="profile__login">
                    Вход
                </div>
            </NuxtLink>
            <NuxtLink to="/auth/sign-up">
                <div class="profile__sign-up">
                    Регистрация
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    $color: white;
    $padding: 10px;
    $secondColor: green;

    .profile {
        border-radius: 50%;

        &-avatar {
            display: flex;
            align-items: center;
            column-gap: 10px;
            align-items: center;

            &__img {
                width: 40px;
                height: 40px; 
                border-radius: inherit;   
                cursor: pointer;
            }

            &__logout {
                cursor: pointer;
                transition-duration: 0.2s;
                
                &:hover {
                    color: $secondColor;
                }
            }
        }

        &-login-buttons {
            display: flex;
            column-gap: 10px;
            align-items: center;
        }

        &__login, &__sign-up {
            transition-duration: 0.2s;

            &:hover {
                color: $secondColor;
            }
        }
    }
</style>