import type { Profile } from "~/utils/interfaces";

interface ProfileState {
    profile: Profile | undefined;
    error: number | undefined;
    isPending: boolean;
}

export const useProfileStore = defineStore('profile', {
    state: (): ProfileState => ({ profile: undefined, error: undefined, isPending: false }),
    actions: {
        async getProfile(id: string, userId: string = '') {
            this.isPending = true;

            const result = await $fetch(PROFILE_URL + `/by-id?id=${id}&userId=${userId}`) as any;

            if (result.profile !== undefined) {
                this.profile = {...result.profile, isFriend: result.isFriend, friendSince: result.friendSince} as Profile;
            }

            this.isPending = false;

            if (result.error !== undefined) {
                this.error = result.error.status || 404;
            }
        },

        resetProfile() {
            this.profile = undefined;
            this.error = undefined;
            this.isPending = false;
        }
    }
})