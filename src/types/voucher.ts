export interface IVouchers {
    _id?: string;
    code?: string;
    value?: number;
    quantity?: number;
    date_start: Date;
    date_end?: Date;
    status: boolean;

}