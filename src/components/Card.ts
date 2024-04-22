import { CategoryType } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";


interface ICardActions {
    onClick: (event: MouseEvent) => void;
}

export interface ICard {
    title: string;
    category: CategoryType; 
    description?: string | string[];
    image: string;
    price: number | null;
}

export class Card extends Component<ICard> {
    protected _title: HTMLElement;
	protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _image: HTMLImageElement;

    protected _categoryMapping: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'другое': 'card__category_other',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'кнопка': 'card__category_button',
	};

    constructor(container: HTMLElement, actions?: ICardActions) {
        super(container);

        const blockName = 'card';

        this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${blockName}__image`, container);
        this._category = container.querySelector(`.${blockName}__category`);
    }

    set title(value: string) {
        this.setText(this._title, value);
    }

    set image(value: string) {
        this.setImage(this._image, value, this.title)
    }

    set price(value: number) {
		value === null
			? this.setText(this._price, `Бесценно`)
			: this.setText(this._price, `${value} синапсов`);
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.className = `card__category ${this._categoryMapping[value]}`;
	}
}