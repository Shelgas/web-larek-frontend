import { AppState } from './components/AppData';
import { Card, CardPreview } from './components/Card';
import { LarekAPI } from './components/LarekAPI';
import { Page } from './components/Page';
import { EventEmitter } from './components/base/events';
import { Modal } from './components/common/Modal';
import './scss/styles.scss';
import { IProduct } from './types';
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

    const callback = item.status === true
        ? { onClick: () => events.emit('card:remove', item)}
        : { onClick: () => events.emit('card:add', item)}
	const card = new CardPreview(cloneTemplate(cardPreviewTemplate), callback);
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
    modal.close();
});

events.on('card:remove', (item: IProduct) => {
    appData.removeFromBasket(item);
    item.status = false;
    page.counter = appData.basketCount;
    modal.close();
});


// заморозка прокрутки при открытии модалки
events.on('modal:open', () => {
	page.locked = true;
});

// разморозка прокрутки при закрытии модалки
events.on('modal:close', () => {
	page.locked = false;
});

api.getProducts()
	.then(appData.setCatalog.bind(appData))
	.catch((error) => {
		console.log(error);
	});