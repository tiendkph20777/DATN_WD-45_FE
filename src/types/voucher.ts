export interface IVouchers {
    _id?: string;
    code?: string;
    value?: string;
    quantity?: number;
    date_start:Date;
    date_end?:Date;
    status:boolean;
  
}