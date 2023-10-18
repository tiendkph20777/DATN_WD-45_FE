export interface IProducts {
    [x: string]: any;
    _id: string | number;
    name: string,
    brand_id: string,
    images: string,
    price: number,
    price_sale: number | string,
}