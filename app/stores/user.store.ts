import { mande, type MandeInstance } from "mande";
import { BAD_REQUEST_CODE } from "~/utils/errors";
import type { APIError, Profile, User } from "~/utils/interfaces";
import { ValidateNickname } from "~/utils/validations";

interface UserState {
    user: User | undefined;
    isFetched: boolean;
    isPending: boolean;
}

interface UserUpdate {
    nickname: string;
    description: string;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({ user: undefined, isFetched: false, isPending: false }),
    actions: {
        async loginUser(email: string, password: string) {
            this.isPending = true;

            const result = await $fetch(AUTH_URL + '/login', {
                method: 'post',
                credentials: 'include',
                body: {
                    email,
                    password,
                },
            }) as any;

            this.isPending = false;

            if (result.profile !== undefined) {
                this.user = result.profile as User;
            }

            return result.error as APIError;
        },

        async registerUser(email: string, password: string, nickname: string, description: string) {
            this.isPending = true;

            const result = await $fetch(PROFILE_URL, {
                method: 'post',
                credentials: 'include',
                body: {
                    email,
                    password,
                    nickname,
                    description,
                },
            }) as any;

            this.isPending = false;

            if (result.profile !== undefined) {
                this.user = result.profile as User;
            }

            return result.error as APIError;
        },

        async getBySession() {
            const result = await $fetch(PROFILE_URL + '/by-session', {credentials: 'include'}) as any;

            if (result.profile !== undefined) {
                this.user = result.profile as User;
            }

            this.isFetched = true;

            return result as APIError;
        },

        async updateUser({ nickname, description }: UserUpdate) {
            if (!this.user) {
                return;
            }

            this.isPending = true;
            let error: APIError | undefined;

            await $fetch(PROFILE_URL + `/by-id?id=${this.user.id}&userId=${this.user.id}`, {
                method: 'PUT',
                body: JSON.stringify({nickname, description}),
            }).then((res: any) => {
                if (res.profile !== undefined) {
                    this.user = res.profile as Profile;
                }
            }).catch((rej) => {
                error = { status: BAD_REQUEST_CODE, message: NICKNAME_ALREADY_EXIST };
            }).finally(() => {
                this.isPending = false;
            });

            return error;
        },

        resetUser() {
            this.user = undefined;
            this.isFetched = false;
        },

        async logout() {
            const result = await $fetch(AUTH_URL + '/logout', {
                credentials: 'include',
                method: 'post',
            }) as any;

            if (result.data !== undefined) {
                this.user = undefined;
            }

            return result.error as APIError;
        }
    }
})