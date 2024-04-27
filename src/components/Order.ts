import {Form} from "./common/Form";
import {IOrderForm} from "../types";
import {IEvents} from "./base/events";
import {ensureAllElements, ensureElement} from "../utils/utils";

export class Order extends Form<IOrderForm> {
    private _buttons: HTMLButtonElement[];


    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);
        this._buttons = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);
        this._buttons.forEach((button) => {
			
			button.addEventListener('click', () => {
                this.paymentChoose(button.name);
                events.emit('order.payment:change', {
                    field: 'payment',
                    value: button.name
                })
			});
		});
    }

    paymentChoose(name: string) {
		this._buttons.forEach((button) => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}

	set payment(value: string) {
		
		this._buttons.forEach((button) => {
			
			if (button.classList.contains('button_alt-active')) {
				this.toggleClass(button, 'button_alt-active');
			}
		});
	}
}