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

export interface IOrderRequest extends IOrder {  // интерфейс данных передаваемых в запрос 
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
    orderProducts: (order: IOrder) => Promise<IOrderRequest>;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>; // интерфейс ошибки


export interface IComponentActions { // интерфейс события компонента
    onClick: (event: MouseEvent) => void;
}

//интерфейсы представлений

export interface IBasketItem {
    index: number;
    title: string;
    price: number;
}

export interface ICard {
    title: string;
    category: CategoryType; 
    description?: string | string[];
    image: string;
    price: number | null;
    status: boolean;
}

export interface IPage {
    counter: number;
    catalog: HTMLElement[];
}

export interface IBasketView {
    items: HTMLElement[];
    total: number;
}


export interface IFormState {
    valid: boolean;
    errors: string[];
}

export interface ISuccess {
	total: number;
}

