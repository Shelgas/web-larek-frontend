import { AppState } from './components/AppData';
import { BasketItem } from './components/BasketItem';
import { Card, CardPreview } from './components/Card';
import { Contacts } from './components/Contacts';
import { LarekAPI } from './components/LarekAPI';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { Success } from './components/common/Succes';
import './scss/styles.scss';
import { IContactsForm, IOrder, IOrderForm, IProduct } from './types';
import { CDN_URL, API_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

events.onAll(({ eventName, data }) => {
    console.log(eventName, data);
})

// шаблоны

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate<HTMLFormElement>(orderFormTemplate), events);
const contacts = new Contacts(cloneTemplate<HTMLFormElement>(contactsFormTemplate), events);


events.on('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});

events.on('card:select', (item: IProduct) => {
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			if (item.status === true) {
				events.emit('card:remove', item);
				item.status = false;
			}
			else 
			{
				events.emit('card:add', item);
				item.status = true;
			}
		}
	});
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			description: item.description,
            price: item.price,
            status: item.status,
            
		}),
	});

});


events.on('card:add', (item: IProduct) => {
    appData.addToBasket(item);
    item.status = true;
    page.counter = appData.basketCount;
});

events.on('card:remove', (item: IProduct) => {
    appData.removeFromBasket(item);
    item.status = false;
    page.counter = appData.basketCount;
});

events.on('basket:open', () => {
    let totalPrice: number = 0;
    let index: number = 0;
	basket.items = appData.basket.map((item) => {
        totalPrice += item.price;
		const card = new BasketItem(cloneTemplate(cardBasketTemplate), {
			onClick: () => events.emit('basketItem:remove', item),
		});
		return card.render({
			title: item.title,
			price: item.price,
            index: ++index,
		});
	});
    basket.total = totalPrice;
    modal.render({
		content: basket.render(),
	});
});

events.on('basketItem:remove', (item: IProduct) => {
    events.emit('card:remove', item);
    events.emit('basket:open');
});

events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			payment: '',
			valid: false,
			errors: [],
		}),
	});
});

events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});


events.on(/^(?:order|contacts)\..*:change/, (data: { field: keyof IOrder, value: string }) => {
    appData.setOrderField(data.field, data.value);
});


events.on('contacts:submit', () => {
	api.orderProducts(appData.getRequest())
		.then((res) => {
			appData.clearOrderInfo();
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});

			modal.render({
				content: success.render({
					total: res.total,
				}),
			});

			appData.clearBasket();
			page.counter = 0;
		})
		.catch((err) => {
			console.error(err);
		});
});


events.on('formErrors:change', (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	order.valid = !address && !payment;
	contacts.valid = !email && !phone;
	order.errors = Object.values({ address, payment })
		.filter((i) => !!i)
		.join('; ');
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});


events.on('modal:open', () => {
	page.locked = true;
});


events.on('modal:close', () => {
	page.locked = false;
});


api.getProducts()
	.then(appData.setCatalog.bind(appData))
	.catch((error) => {
		console.log(error);
	});