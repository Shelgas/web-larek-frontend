export type CategoryType = 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное';

export interface IProduct { 
    id: string;
    title: string;
	description: string; 
	image: string; 
	category: CategoryType;
	price: number | null;
}

enum PaymentType {
    Online = 'Онлайн',
    UponReceipt = 'При получении'
  }

export interface IContactsForm {
	phone: string;
	email: string;
}

export interface IOrderForm {
	address: string;
	payment: PaymentType;
}

export interface IOrder extends IOrderForm, IContactsForm {
    items: string[]
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    order: IOrder | null;
}

export interface IBasketItem {
    index: number;
    title: string;
    price: number | null;
} 

export interface IBasketCard {
	items: IBasketItem[];
	total: number; 
}