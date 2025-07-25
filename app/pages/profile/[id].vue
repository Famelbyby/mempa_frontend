<script setup lang="ts">
import { useProfileStore } from '~/stores/profile.store';

    const router = useRoute();
    const profileId = router.params.id || '';
    const profileStore = useProfileStore();
    const userStore = useUserStore();

    await update();

    async function update() {
        if (profileId instanceof Array) {
            await profileStore.getProfile(profileId[0] || '', userStore.user?.id || '');
        } else {
            await profileStore.getProfile(profileId, userStore.user?.id || '');
        }
    }

    watchPostEffect(() => {
        update();
    })
</script>

<template>
    <div class="profile-page">
        <template v-if="!profileStore.isPending">
            <template v-if="profileStore.profile !== undefined">
                <ProfileHeader />
                <ProfileContent />
            </template>
            <SharedNotFound v-else />
        </template>
        <SharedSpinner v-else />
    </div>
</template>

<style lang="scss" scoped>
    .profile {
        &-page {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            align-items: center;
            padding: 20px;
            row-gap: 30px;
        }
    }
</style>