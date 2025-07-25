import type { APIError, Friend, Profile, User } from "~/utils/interfaces";
import { ValidateNickname } from "~/utils/validations";

interface AddFriendData {
    data: {
        friendId: string;
        userId: string;
    };
}

interface FriendsState {
    friends: Friend[];
    invites: Profile[];
    error: number | undefined;
}

export const useFriendsStore = defineStore('friends', {
    state: (): FriendsState => ({ friends: [], error: undefined, invites: [] }),
    actions: {
        async getFriends(nickname: string = '') {
            const result = await $fetch(FRIENDS_URL + `?nickname=${nickname}`, {credentials: 'include'}) as any;

            if (result.friends !== undefined) {
                this.friends = result.friends as Friend[];
            }

            return result.error as APIError;
        },

        async getInvites(nickname: string = '') {
            const result = await $fetch(FRIENDS_URL + `/invites?nickname=${nickname}`, {credentials: 'include'}) as any;

            if (result.invites !== undefined) {
                this.invites = result.invites as Profile[];
            }

            return result.error as APIError;
        },

        async addFriend(friendId: string) {
            const result = await $fetch(FRIENDS_URL, {
                method: 'post',
                credentials: 'include',
                body: JSON.stringify({friendId}),
            }) as any;

            return result.error as APIError;
        },

        async deleteFriend(friendId: string) {
            const result = await $fetch(FRIENDS_URL + `/${friendId}`, {method: 'DELETE', credentials: 'include'}) as any;

            if (result.data !== undefined) {
                this.friends = this.friends.filter((fr) => fr.id !== friendId);
            }

            return result.error as APIError;
        },

        resetFriends() {
            this.friends = [];
            this.error = undefined;
        },

        resetInvites() {
            this.invites = [];
            this.error = undefined;
        }
    }
})