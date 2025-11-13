import { validateControl } from "./shared.js";

class BsInput extends HTMLElement {
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
		const errorMessage = this.getAttribute('error');


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
				<bs-select
				label="${labelText}"
				name="${name}"
				id="${id}"
				class="${extraClasses}"
				placeholder="${placeholder}"
				options='${options}'
				${required}
				${disabled}></bs-select>
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
						${errorMessage || "You must select an option before submitting."}
					</div>
				</div>
            `;
		}

		this.innerHTML = html;
	}

	validation() {
		const inputEl = this.querySelector('input');
		if (!inputEl) return;

		inputEl.addEventListener('input', () => {
			validateControl(inputEl)
		});
		inputEl.addEventListener('blur', () => {
			validateControl(inputEl)
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
}

customElements.define('bs-input', BsInput);