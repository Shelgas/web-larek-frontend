export type CategoryType = 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное'; // категории товаров 

export interface IProduct {   // интерфейс товаров 
    id: string;
    title: string;
	description: string; 
	image: string; 
	category: CategoryType;
	price: number | null;
    status: boolean;
}

export interface IContactsForm { // интерфейс формы контактных данных 
	phone: string;
	email: string;
}

export interface IOrderForm { // интерфейс формы с адресом доставки
	address: string;
	payment: string;
}

export interface IOrder extends IOrderForm, IContactsForm { // интерфейс данных заказа

}

export interface IOrderRequest extends IOrder { 
    total: number,
    items: string[]
}

export interface IAppState { // интерфейс данных приложения
    catalog: IProduct[];
    basket: string[];
    order: IOrder | null;
}

export interface IBasketItem { // интерфейс элемента корзины
    index: number;
    title: string;
    price: number | null;
} 

export interface IBasketCard { // интерфейс корзины
	items: IBasketItem[];
	total: number; 
}

export interface ILarekAPI { // интерфейс API
    getProducts: () => Promise<IProduct[]>;
    getProductById: (id: string) => Promise<IProduct>;
    orderProducts: (order: IOrder) => Promise<IOrderResult>;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

export interface IOrderResult {
	total: number;
}