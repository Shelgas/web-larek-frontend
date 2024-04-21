# Проектная работа "Веб-ларек"

## О проекте

Web-ларёк - интернет-магазин с товарами для веб-разработчиков. В нём можно посмотреть каталог товаров, добавить товары в корзину и сделать заказ. 

## Используемый стек

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Ключевые типы данных
 
 ```
export type CategoryType = 'софт-скил' | 'хард-скил' | 'другое' | 'кнопка' | 'дополнительное'; // категории товаров 

export interface IProduct {   // интерфейс товаров 
    id: string;
    title: string;
	description: string; 
	image: string; 
	category: CategoryType;
	price: number | null;
}

enum PaymentType { // перечсление способов оплаты заказа
    Online = 'Онлайн',
    UponReceipt = 'При получении'
  }

export interface IContactsForm { // интерфейс формы контактных данных 
	phone: string;
	email: string;
}

export interface IOrderForm { // интерфейс формы с адресом доставки
	address: string;
	payment: PaymentType;
}

export interface IOrder extends IOrderForm, IContactsForm { // интерфейс данных заказа
    items: string[];
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

 ```