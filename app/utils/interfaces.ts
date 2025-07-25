export interface User {
    id: string;
    nickname: string;
    createdAt: string;
    avatarUrl: string;
    email: string;
    description: string;
    pointsCount?: number;
}

export interface Profile extends User {
    isFriend?: boolean;
    friendSince?: string;
}

export interface Friend extends Profile {}

export interface Point {
    id: string;
    createdAt: string;
    review: string;
    rating: number;
    ownderId: string;
    coordinates: string[];
    imageUrl: string;
    name: string;
}

export interface LatLng {
    lat: number;
    lng: number;
}

export interface APIError {
    status: number;
    message: string;
}

export type FriendsPageMode = 'friends' | 'invites';