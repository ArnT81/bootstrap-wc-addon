import { validateControl } from "./shared.js";

export class BsInput extends HTMLElement {
	connectedCallback() {
		this.render();
		this.validation();
		this.handleForm();
	}


	render() {
		let options = [];
		try { options = JSON.parse(this.getAttribute("options") || "[]") }
		catch (e) { console.error("Invalid JSON in options attribute", e) }

		const type = this.getAttribute('type') || 'text';
		const name = this.getAttribute('name') || '';
		const labelText = this.getAttribute('label') || '';
		const required = this.hasAttribute('required');
		const value = this.getAttribute('value') || '';
		const extraClasses = this.getAttribute('class') || '';
		const disabled = this.getAttribute('disabled') !== null ? 'disabled' : '';
		const id = this.getAttribute('id') || '';
		const placeholder = this.getAttribute('placeholder') || '';
		const errorMessage = this.getAttribute('error') || '';


		const floating = extraClasses.includes('form-floating')
		let html = '';


		if (type === 'checkbox') {
			html = `
				<div class="form-check ${extraClasses}">
					<input name="${name}" type="checkbox" class="form-check-input" id="${name}" ${required ? 'required' : ''}>

					<label class="form-check-label" for="${name}">${labelText}</label>

					<div class="invalid-feedback" aria-live="polite" role="alert">
						${errorMessage || "You must check this before submitting."}
					</div>
				</div>
            `;
		}
		else if (type === 'radio') {
			if (!name) console.error("name is required for bs-input of type radio");
			if (!options) console.error("options is required for bs-input of type radio");

			let radiosHtml = options.map(opt => {
				const idValue = opt.id || `${name}-${opt.value}`;
				return `
					<div class="form-check">
						<input
							class="form-check-input"
							type="radio"
							name="${name}"
							id="${idValue}"
							value="${opt.value}"
							${required ? 'required' : ''}
							${disabled ? 'disabled' : ''}
						>

						<label class="form-check-label" for="${idValue}">
							${opt.label}
						</label>
					</div>
				`;
			}).join('');

			html = `
				<div class="mb-3 ${extraClasses}">
					<fieldset>
						<legend class="form-label">
							${labelText}
						</legend>

						${radiosHtml}

						<div class="invalid-feedback" aria-live="polite" role="alert">
							${errorMessage || "You must select an option before submitting."}
						</div>
					</fieldset>
				</div>
			`;
		}

		else if (type === 'select') {
			html = `
				<div class="mb-3 ${extraClasses}">
					<bs-select
						label="${labelText}"
						name="${name}"
						id="${id}"
						placeholder="${placeholder}"
						options='${JSON.stringify(options)}'
						${required ? 'required' : ''}
						${disabled ? 'disabled' : ''}
						error="${errorMessage}"
					></bs-select>
				</div>
			`;
		}


		else {
			const label = `<label for="${name}" class="${floating ? '' : 'form-label'}">${labelText}</label>`;

			html = `
				<div class="mb-3 ${extraClasses}">

				${floating ? '' : label}

				<input placeholder="${placeholder}" name="${name}" type="${type}" class="form-control" id="${name}" value="${value}" ${required ? 'required' : ''}>

				${floating ? label : ''}

					<div class="invalid-feedback" aria-live="polite" role="alert">
						${errorMessage || "This field is required!"}
					</div>
				</div>
            `;
		}

		this.innerHTML = html;
	}

	validation() {
		const inputEls = this.querySelectorAll('input, select');
		if (!inputEls.length) return;

		inputEls.forEach(inputEl => {
			if (inputEl.tagName.toLowerCase() === 'select') {
				inputEl.addEventListener('change', () => validateControl(inputEl));
			}

			inputEl.addEventListener('input', () => validateControl(inputEl));
			inputEl.addEventListener('change', () => validateControl(inputEl));
			inputEl.addEventListener('blur', () => validateControl(inputEl));
		});
	}

	handleForm() {
		const form = this.closest('form');
		if (!form) return;

		if (form.dataset.preventHandlerAdded) return;
		form.dataset.preventHandlerAdded = 'true';

		(function handleSubmit() {
			form.addEventListener('submit', (event) => {
				const inputs = form.querySelectorAll('input, select, textarea');
				let allValid = true;

				inputs.forEach(input => {
					const valid = input.checkValidity();
					validateControl(input);
					if (!valid) allValid = false;
				});

				if (!allValid) {
					event.preventDefault();
					event.stopImmediatePropagation();
					return false;
				}
			});
		})();

		(function handleReset() {
			form.addEventListener('reset', (event) => {
				const inputs = form.querySelectorAll('input, select, textarea');

				inputs.forEach(input => {
					const formGroup = input.closest('.mb-3, fieldset, .form-check');
					input.classList.remove('is-invalid', 'is-valid');
					formGroup?.classList.remove('is-invalid', 'is-valid');
				});
			});
		})();
	}

	get value() {
		const inputEl = this.querySelector('input');
		if (!inputEl) return null;
		if (inputEl.type === 'checkbox') return inputEl.checked;
		return inputEl.value;
	}

	documentation() {
		return {
			"tag name": "bs-input",
			description: "A Bootstrap-styled input web component that supports text, checkbox, radio, and select types, with built-in validation and error messages.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\">"
			},
			attributes: {
				type: {
					description: "Type of input. Supported types: text, checkbox, radio, select.",
					type: "string",
					example: `<bs-input type="text"></bs-input>`,
					default: "text"
				},
				name: {
					description: "HTML name attribute used in forms.",
					type: "string",
					example: `<bs-input name="firstName"></bs-input>`,
					default: ""
				},
				label: {
					description: "Label text displayed for the input.",
					type: "string",
					example: `<bs-input label="First Name"></bs-input>`,
					default: ""
				},
				required: {
					description: "Marks the input as required.",
					type: "boolean (presence-based)",
					example: `<bs-input required></bs-input>`,
					default: false
				},
				options: {
					description: "For type 'radio' or 'select', an array of options. Each object can have `value`, `label`, and optional `selected` boolean.",
					type: "JSON array",
					example: `options='[{"value":"1","label":"One"},{"value":"2","label":"Two","selected":true}]'`,
					default: "[]"
				},
				placeholder: {
					description: "Placeholder text (for text input) or hidden option text (for select).",
					type: "string",
					example: `<bs-input placeholder="Enter your name"></bs-input>`,
					default: ""
				},
				class: {
					description: "Additional CSS classes applied to the wrapper div.",
					type: "string",
					example: `<bs-input class="col-md-6 mb-3"></bs-input>`,
					default: ""
				},
				disabled: {
					description: "Disable the input if present.",
					type: "boolean (presence-based)",
					example: `<bs-input disabled></bs-input>`,
					default: false
				},
				id: {
					description: "HTML id attribute for the input element.",
					type: "string",
					example: `<bs-input id="firstName"></bs-input>`,
					default: ""
				},
				error: {
					description: "Custom error message to display in invalid-feedback.",
					type: "string",
					example: `<bs-input error='Please enter a valid first name'></bs-input>`,
					default: ""
				}
			},
			events: {
				change: {
					description: "Fired when the input value changes. For checkbox, radio, and select types, includes the current value in event.detail.value.",
					example: `document.querySelector('bs-input[name="firstName"]').addEventListener('change', (e) => {console.log(e.detail.value);});`
				}
			}
		};
	}
}

customElements.define('bs-input', BsInput);