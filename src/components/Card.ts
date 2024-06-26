import { ICard, IComponentActions } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";


export class Card extends Component<ICard> {
    protected _title: HTMLElement;
	protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _image: HTMLImageElement;
    protected _blockName: string; 

    protected _categoryMapping: { [key: string]: string } = {
		'софт-скил': 'card__category_soft',
		'другое': 'card__category_other',
		'хард-скил': 'card__category_hard',
		'дополнительное': 'card__category_additional',
		'кнопка': 'card__category_button',
	};

    constructor(container: HTMLElement, actions?: IComponentActions) {
        super(container);

        this._blockName = 'card';

        this._title = ensureElement<HTMLElement>(`.${this._blockName}__title`, container);
        this._image = ensureElement<HTMLImageElement>(`.${this._blockName}__image`, container);
        this._category = container.querySelector(`.${this._blockName}__category`);
        this._price = container.querySelector(`.${this._blockName}__price`);

        if (actions?.onClick) {
			container.addEventListener('click', actions.onClick);
		}
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

export class CardPreview extends Card {
	protected _description: HTMLElement;
	protected _buttonElement: HTMLButtonElement;
    // protected _status: boolean;

	constructor(container: HTMLElement, actions?: IComponentActions) {
		super(container);
		this._description = container.querySelector(`.card__text`);
		this._buttonElement = container.querySelector(`.card__button`);

        
		if (actions?.onClick) {
			if (this._buttonElement) {
				this._buttonElement.addEventListener('click', actions.onClick);
                this._buttonElement.addEventListener('click', () => this.changeButtonText());
			}
		}

	}

	set description(value: string) {
		this.setText(this._description, value);
	}


    set status(value: boolean) {
        if (this._price.textContent != `Бесценно`) {
            value === true
                ? this.setText(this._buttonElement, 'Убрать')
                : this.setText(this._buttonElement, 'Купить')
        }
	}

    set price(value: number | null) {
        super.price = value; 
        if (value === null) {
            this.setText(this._buttonElement, 'Нельзя купить');
            this.setDisabled(this._buttonElement, true);
        }
    }

    private changeButtonText(): void {
        this.status = this._buttonElement.textContent === 'Купить' 
        ? true : false;

    }

}

