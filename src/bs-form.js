import { validateControl } from "./shared.js";

export class BsForm extends HTMLElement {
	constructor() {
		super();
		this._formData = new FormData(); // Intern FormData-objekt
	}

	connectedCallback() {
		let controls;
		const extraClasses = this.getAttribute('class') || '';
		const id = this.getAttribute('id') || '';

		const form = document.createElement('form');
		form.id = id;
		form.className = `needs-validation ${extraClasses}`;
		form.setAttribute('novalidate', '');

		//Append children to the form
		while (this.firstChild) {
			form.appendChild(this.firstChild);
		}
		this.appendChild(form);

		const validate = () => {
			controls = Array.from(form.querySelectorAll('input, select, textarea'));

			const results = controls.map(el => validateControl(el));
			const isValid = results.every(ok => ok);

			if (!isValid) {
				form.classList.add('was-validated');
				const firstInvalid = controls.find(el => !el.checkValidity());
				if (firstInvalid) firstInvalid.focus();
			}

			return isValid;
		};

		//  Validation on input or change events
		const updateValidation = () => {
			controls = Array.from(form.querySelectorAll('input, select, textarea'));
			controls.forEach(el => {
				['input', 'change'].forEach(event => {
					el.removeEventListener(event, validate); // Prevent double listeners
					el.addEventListener(event, () => {
						validate();
						// Update FormData on every change
						this._formData = new FormData(form);
					});
				});
			});
		};

		// Initial validation and listeners for new elements
		updateValidation();

		//Note changes in the form to handle dynamically added elements
		const observer = new MutationObserver(() => {
			updateValidation();
		});
		observer.observe(form, { childList: true, subtree: true });


		form.addEventListener('submit', (e) => {
			const isValid = validate();

			// Uppdate FormData
			this._formData = new FormData(form);

			// Lets the original submit event bubble up if validation returns true
			if (!isValid && e.cancelable) {
				e.preventDefault();
			}
		});

		// Properties and methods
		Object.defineProperty(this, 'elements', {
			get: () => controls || []
		});
		Object.defineProperty(this, 'length', {
			get: () => controls?.length || 0
		});
		Object.defineProperty(this, 'isValid', {
			get: () => controls?.every(el => el.checkValidity()) || false
		});

		this.submit = () => form.requestSubmit();
		this.reset = () => form.reset();
		this.getFormData = () => this._formData;
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-form", BsForm) })