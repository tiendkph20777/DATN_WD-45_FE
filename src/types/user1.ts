export interface IAuth {
    _id: string | number;
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    fullName: string;
    gender: string;
    image: string;
    role_id: string;
}