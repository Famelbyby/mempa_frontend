import { MAX_POINT_NAME_LENGTH, MAX_POINT_RATING, MIN_NICKNAME_LENGTH, MIN_PASSWORD_LENGTH, MIN_POINT_NAME_LENGTH, MIN_POINT_RATING } from "./consts";

export const ValidateNickname = (nickname: string): boolean => {
    return nickname.length >= MIN_NICKNAME_LENGTH;
}

export const ValidateEmail = (email: string): boolean => {
    return !!email.match(/(.)+@(.)+\.(.)+/);
}

export const ValidatePassword = (password: string): boolean => {
    return password.length >= MIN_PASSWORD_LENGTH;
}

export const ValidatePointRating = (rating: number): boolean => {
    return !isNaN(rating) && rating <= MAX_POINT_RATING && rating >= MIN_POINT_RATING;
}

export const ValidatePointName = (name: string): boolean => {
    return name.length <= MAX_POINT_NAME_LENGTH && name.length >= MIN_POINT_NAME_LENGTH;
}