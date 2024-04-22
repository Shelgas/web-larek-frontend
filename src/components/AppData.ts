import { Model } from './base/Model';
import {
	IAppState,
	IOrder,
	IProduct,
	IContactsForm,
    PaymentType,
    CategoryType
} from '../types/index';

export type CatalogChangeEvent = {
	catalog: IProduct[];
};

export class Product extends Model<IProduct> {
    id: string;
    title: string;
	description: string;
	image: string;
	category: CategoryType;
	status: boolean = false;
	price: number | null;
}


export class AppState extends Model<IAppState> {
    basket: IProduct[] = [];
    catalog: IProduct[];

    order: IOrder = {
        email: '',
        phone: '',
        address: '',
        payment: PaymentType.Online,
        items: []
    };

    setCatalog(products: IProduct[]) {
        this.catalog = products.map(product => new Product(product, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    addToBasket(product: IProduct) {
		this.basket.push(product);
	}

    removeFromBasket(product: IProduct) {
		const index = this.basket.indexOf(product);
		if (index >= 0) {
			this.basket.splice(index, 1);
		}
	}

    get basketCount() {
        return this.basket.length;
    }

}