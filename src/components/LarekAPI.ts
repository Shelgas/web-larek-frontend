import { Api, ApiListResponse } from './base/api';
import {IOrder, IProduct, ILarekAPI, IOrderRequest} from "../types";


export class LarekAPI extends Api implements ILarekAPI{
    readonly cdn: string;

    constructor(cdn: string, baseUrl: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProduct[]> {
        return this.get('/product').then((data: ApiListResponse<IProduct>) =>
            data.items.map((item) => ({
                ...item,
                image: this.cdn + item.image
            })));
    }

    getProductById(id: string): Promise<IProduct> {
        return this.get(`/product/${id}`).then(
            (item: IProduct) => ({
                ...item,
                image: this.cdn + item.image,
            })
        );
    }

    orderProducts(order: IOrderRequest): Promise<IOrderRequest> {
        return this.post('/order', order).then((data: IOrderRequest) => data);
    };
    
}