//Status codes
export const BAD_REQUEST_CODE = 400;

//Response errors
export const RESPONSE_BAD_EMAIL = 'email has incorrect format';
export const RESPONSE_BAD_PASSWORD = 'password length must be at least 8';
export const RESPONSE_EMAIL_DOESNT_EXIST = "email doesn't exist";
export const RESPONSE_WRONG_PASSWORD = 'password is wrong';
export const RESPONSE_NICKNAME_ALREADY_EXIST = 'nickname already used';
export const RESPONSE_EMAIL_ALREADY_EXIST = 'email already used';

//UI errors' titles
export const BAD_EMAIL = 'Неправильный формат почты';
export const BAD_PASSWORD = 'Длина пароля должна быть не менее 8';
export const EMAIL_DOESNT_EXIST = 'Пользователя с такой почтой нет';
export const EMAIL_ALREADY_EXIST = 'Пользователь с такой почтой уже существует';
export const WRONG_PASSWORD = 'Неправильный пароль';
export const BAD_NICKNAME = 'Длина никнейма должна быть не менее 4';
export const NICKNAME_ALREADY_EXIST = 'Пользователь с таким никнеймом уже существует';
export const BAD_POINT_NAME = 'Длина названия - от 4 до 50 символов';
export const BAD_POINT_RATING = 'Рейтинг - не менее 0 и не более 5';