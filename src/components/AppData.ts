import { Model } from './base/Model';
import {
	IAppState,
	IOrder,
	IProduct,
	IContactsForm,
    CategoryType,
    IOrderForm,
    FormErrors,
    IOrderRequest
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
    formErrors: FormErrors = {};
    total: number = 0;

    order: IOrder = {
        address: '',
        payment: '',
        email: '',
        phone: '',
    };

    setCatalog(products: IProduct[]) {
        this.catalog = products.map(product => new Product(product, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    addToBasket(product: IProduct) {
		this.basket.push(product);
        this.total += product.price;
	}

    removeFromBasket(product: IProduct) {
		const index = this.basket.indexOf(product);
        this.total -= product.price;
		if (index >= 0) {
			this.basket.splice(index, 1);
		}
	}

    get basketCount() {
        return this.basket.length;
    }

    get isBasketEmpty() {
        if (this.basket.length > 0)
            return false;
        return true;
    }

    setOrderField(field: keyof IOrder, value: string) {
        this.order[field] = value;

        if (this.validateOrderForm()) {
            this.events.emit('order:ready', this.order);
        }
    }

    getRequest(): IOrderRequest {
        return Object.assign({ 
            total: this.total,
            items: this.basket.map(product => product.id)
            }, 
        this.order);
    }


    validateOrderForm() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.payment) {
            errors.payment = 'Необходимо указать способ оплатые';
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать номер телефона';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

   clearBasket() {
    this.basket.forEach((product) => this.events.emit('card:remove', product));
    this.basket = [];
   }

}