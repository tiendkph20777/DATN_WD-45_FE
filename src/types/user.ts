export interface IAuth {
    _id: string | number;
    name: string
    email: string;
    password: string;
    confirmPassword: string;
    fullName: string;
    gender: string;
    address: string;
    image: string;
    tel: number;
    role_id: string;
}