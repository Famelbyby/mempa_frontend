import { mande, type MandeInstance } from "mande";
import { BASE_URL, PROFILE_URL } from "~/utils/consts";
import type { APIError, Profile, User } from "~/utils/interfaces";
import { ValidateNickname } from "~/utils/validations";

interface MainState {
    profiles: Profile[];
}

export const useMainStore = defineStore('main', {
    state: (): MainState => ({ profiles: []}),
    actions: {
        async getProfiles(nickname: string = '') {
            const result = await $fetch(PROFILE_URL + `?nickname=${nickname}`,
                {
                    credentials: 'include',
                },
            ) as any;

            if (result.profiles !== undefined) {
                this.profiles = result.profiles as Profile[];
            }

            return result.error as APIError;
        },

        updateProfile(profile: Profile) {
            const itemIndex = this.profiles.findIndex((pr) => pr.id === profile.id);

            if (!~itemIndex) {
                return;
            }

            this.profiles.splice(itemIndex, 1, profile);
        },

        resetProfiles() {
            this.profiles = [];
        }
    }
})