export interface IAuth {
    _id: string | number;
    email: string;
    password: string;
    confirmPassword: string;
    userName: string;
    fullName: string;
    gender: string;
    address: string;
    image: string;
    tel: number;
    role_id: string;
}