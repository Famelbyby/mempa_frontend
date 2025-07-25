import { mande, type MandeInstance } from "mande";
import { BASE_URL, PROFILE_URL } from "~/utils/consts";
import type { APIError, Point, Profile, User } from "~/utils/interfaces";
import { ValidateNickname } from "~/utils/validations";

interface PointsState {
    points: Point[];
    error: number | undefined;
    isPending: boolean;
    owner: undefined | Profile;
}

interface AddPointData {
    review: string;
    rating: number;
    coordinates: string[];
    ownerId: string;
    name: string;
}

interface UpdatePointData {
    review: string;
    rating: number;
    pointId: string;
    ownerId: string;
    name: string;
}

export const usePointsStore = defineStore('points', {
    state: (): PointsState => ({ points: [], error: undefined, isPending: true, owner: undefined }),
    actions: {
        async getOwner(ownerId: string) {
            const result = await $fetch(PROFILE_URL + `/${ownerId}`,
                {
                    credentials: 'include',
                },
            ) as any;

            if (result.owner !== undefined) {
                this.owner = result.owner as Profile;
            }

            return result.error as APIError;
        },

        async getPoints(ownerId: string) {
            this.isPending = true;

            const result = await $fetch(POINTS_URL + `/${ownerId}`,
                {
                    credentials: 'include',
                },
            ) as any;

            this.isPending = false;

            if (result.points !== undefined) {
                this.points = result.points as Point[];
            }

            return result.error as APIError;
        },

        async addPoint({review, rating, coordinates, ownerId, name}: AddPointData) {
            this.isPending = true;

            const result = await $fetch(POINTS_URL + `/${ownerId}`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify({review, rating, coordinates, name})
            }) as any;

            this.isPending = false;

            if (result.point !== undefined) {
                this.points.push(result.point as Point);
            }

            return result.error as APIError;
        },

        async deletePoint(ownderId: string, pointId: string) {
            const result = await $fetch(POINTS_URL + `/${ownderId}`, {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    pointId,
                }),
            }) as any;

            if (result.data !== undefined) {
                this.points = this.points.filter((p) => p.id !== pointId);
            }

            return result.error as APIError;
        },

        async updatePoint({pointId, ownerId, review, rating, name}: UpdatePointData) {
            const result = await $fetch(POINTS_URL + `/${ownerId}`, {
                method: 'PUT',
                credentials: 'include',
                body: JSON.stringify({pointId, rating, review, name}),
            }) as any;

            if (result.point !== undefined) {
                this.points = this.points.map((p) => {
                    if (p.id !== pointId) {
                        return p;
                    }

                    return result.point as Point;
                });
            }

            return result.error as APIError;
        },

        resetPoints() {
            this.points = [];
            this.owner = undefined;
        }
    }
})