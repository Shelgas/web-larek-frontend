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

## Базовые компоненты

### Класс EventEmitter

Позволяет компонентам подписаться на события и уведомлять подписчиков о наступлении события

Методы класса:
- `on<T extends object>(eventName: EventName, callback: (event: T)`  - установить обработчик на событие
- `off(eventName: EventName, callback: Subscriber)` - снять обработчик с события
- `emit<T extends object>(eventName: string, data?: T)` - инициировать событие с данными
- `onAll(callback: (event: EmitterEvent) => void)` - слушать все события
- `offAll()` - сбросить все обработчики
- `trigger<T extends object>(eventName: string, context?: Partial<T>)` - создает коллбек триггер, генерирующий событие при вызов


### Класс Component

Это базовый абстрактный класс,  который является основой для компонентов проекта.
Реализует возможность работы с разметкой на странице: переключать класс, добавлять атрибуты для модификации поведения видимости элемента, добавлять текстовые данные, а также возвращать разметку готового элемента.

Конструктор класса:
- `constructor(protected readonly container: HTMLElement)` - принимает DOM элемент для работы в дочерних компонентах

Методы класса:
- `toggleClass(element: HTMLElement, className: string, force?: boolean)` -  переключает класс у элемента
- `setText(element: HTMLElement, value: unknown)` -  устанавливает текстовое содержимое элемента, проверяя наличие переданного элемента
- `setDisabled(element: HTMLElement, state: boolean)` - делает элемент недоступным для взаимодействия
- `setHidden(element: HTMLElement)` - делает элемент скрытым, принимает DOM-элемент
- `setVisible(element: HTMLElement)` - делает элемент видимым
- `setImage(element: HTMLImageElement, src: string, alt?: string)` - устанавливает теги для изображений
- `render(data?: Partial<T>): HTMLElement` - возвращает DOM-элемент.

### Класс Model
АКласс предназначен для создания модельных данных. Модели используются для представления и управления данными в приложении.
Конструктор класса:
- `constructor(data: Partial<T>, protected events: IEvents)` - принимает данные и событие
Метод класса:
- `emitChanges` - сообщает всем что модель поменялась
  

### Класс Api
Обеспечивает взаимодействие с сервером для получения готовых и отправки сформированных приложением данных

Конструктор класса:
- `baseUrl: string` - адрес сервера
- `options: RequestInit` - опции для доступа к различным параметрам

Методы класса:
- `get(uri: string)` - get-запрос на сервер
- `post(uri: string, data: object, method: ApiPostMethods = 'POST')` - post-запрос на сервер
- `handleResponse(response: Response): Promise<object>` - обрабатывает ответ от сервера


## Компоненты программы

### Класс LarekAPI 
Класс наследуется от базового класса Api, позволяет получить список карточек с сервера. 

Методы класса:
- `getProducts()` - получить список всех продуктов
- `getProductById(id: string)` - получить продукт по id
- `orderProducts(order: IOrder)` - оформить заказ

## Компоненты представления

### Класс Modal

Компонент обтображения модального окна. Отвечает за работу с модальными окнами. 

Конструктор класса:
- `container: HTMLFormElement` - DOM элемент компонента модального окна
- `events: IEvents`- объект событий

Поля класса:
- `closeButton: HTMLButtonElement` - DOM элемент кнопки закрытия модального окна
- `content: HTMLElement` - DOM элемент с контентом страницы 

Методы класса:
- `open()` - открытие модально окна
- `close()` - закрытие модального окна
- `render(data: IModalData)` - определяет вид формы

Свойства класса:
- `set content(value: HTMLElement)` - устанавливает содержимое в модальное окно


### Класс Card

Данные класс служит для отображения карточки и информации по ней в галлереи товаров

Конструктор класса: 
- `container: HTMLElement` - DOM элемент карточки товара 
- `actions?: ICardActions` - действия с карточкой

Поля класса:
- `title: HTMLElement` - DOM элемент названия продукта
- `image: HTMLImageElement` - DOM элемент изображения продукта
- `category: HTMLElement` - DOM элемент категории продукта
- `actions?: ICardActions` - DOM элемент цены продукта

Свойства класса:
- `set title(value: string)` - устанавливает название товара
- `set image(value: string)` - устанавливает картинку товара
- `set price(value: number)` -  устанавливает цену товара
- `set category(value: string)` - устанавливает категорию товара

### Класс CardPreview

Добавляет описание товара, расширяя родительский класс Card

Конструктор класса: 
- `container: HTMLElement` - DOM элемент карточки товара 
- `actions?: ICardActions` - действия с карточкой

Поля класса:
- `_description: HTMLElement` - DOM элемент описания продукта
- `_buttonElement: HTMLButtonElement` - DOM элемент кнопки "добавить в корзину"

Свойства класса:
- `set description(value: string)` - устанавливает описание товара

### Класс Page

Компонент главной страницы. Добавляет на страницу ленту карточек и вешает слушатель на элемент корзины.

Конструктор класса: 
- `container: HTMLElement` - DOM элемент всей страницы
- `events: IEvents` - объект событий

Поля класса:
- `counter: HTMLElement` - DOM элемент счетчика товаров в корзине
- `catalog: HTMLElement` - DOM элемент каталога товаров
- `wrapper: HTMLElement` - DOM элемент главной страницы
- `basket: HTMLElement` - DOM элемент значка корзины

Свойства класса:
- `set counter(value: number)` - устанавливает счетчик на иконке корзины
- `set catalog(items: HTMLElement[])` - устанавливает каталог товаров
- `set locked(value: boolean)` - устанавливает блокировку страницы при вызове модального окна


## Компоненты модели данных

### Класс AppState
Данный класс хранит состояние приложения.

Поля класса:
- `basket: IProduct[]` - список товаров в корзине
- `catalog: IProduct[]` - каталог товаров
- `order: IOrder` - хранит заказ для отправки на сервер

Методы класса:
- `setCatalog: void` - устанавливает каталог продуктов

### Класс Product

Данный класс хранит информацию о товаре.
Поля класса:
- `id: string;` - идентификатор товара в магазине
- `title: string;` - название товара
- `description: string;` - описание товара
- `image: string;` - URL адрес картинки товара
- `category: CategoryType;` - категория товара
- `status: boolean;` - статус товара, в корзине или нет
- `price: number;` - цена товара

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