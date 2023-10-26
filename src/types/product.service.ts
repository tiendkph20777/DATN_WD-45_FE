export interface IProducts {
    [x: string]: any;
    _id: string | number;
    name: string,
    brand_id: string,
    images: any,
    price: number,
    price_sale: number,
    content: string,
    description: string
}