import { IBasketItem, IComponentActions } from "../types";
import { Component } from "./base/Component";


export class BasketItem extends Component<IBasketItem> { 
    protected _index: HTMLElement;
	protected _title: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

    constructor(container: HTMLElement, actions?: IComponentActions) {
		super(container);

		this._title = container.querySelector(`.card__title`);
		this._index = container.querySelector(`.basket__item-index`);
		this._price = container.querySelector(`.card__price`);
		this._button = container.querySelector(`.card__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			}
		}
	}

	set index(value: number) {
		this.setText(this._index, value);
	}

    set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, value + ' синапсов');
	}
}
