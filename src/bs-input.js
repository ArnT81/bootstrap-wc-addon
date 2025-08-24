import { validateControl } from "./shared.js";

class BsInput extends HTMLElement {
	connectedCallback() {
		this.render();
		this.validation();
	}


	render() {
		const options = this.getAttribute("options");
		const type = this.getAttribute('type') || 'text';
		const name = this.getAttribute('name') || '';
		const labelText = this.getAttribute('label') || '';
		const required = this.hasAttribute('required');
		const value = this.getAttribute('value') || '';
		const extraClasses = this.getAttribute('class') || '';
		const disabled = this.getAttribute('disabled') !== null ? 'disabled' : '';
		const id = this.getAttribute('id') || '';
		const placeholder = this.getAttribute('placeholder') || '';


		const floating = extraClasses.includes('form-floating')

		let html = '';

		if (type === 'checkbox') {
			html = `
				<div class="form-check ${extraClasses}">
					<input name="${name}" type="checkbox" class="form-check-input" id="${name}" ${required ? 'required' : ''}>

					<label class="form-check-label" for="${name}">${labelText}</label>

					<div class="invalid-feedback" aria-live="polite" role="alert">
						You must agree before submitting.
					</div>
				</div>
            `;
		}
		else if (type === 'radio') {
			html = `
				<div class="form-check ${extraClasses}">
					<input
						class="form-check-input"
						type="radio"
						name="${name}"
						id="${id}"
						value="${value || ''}"
						${required ? 'required' : ''}
						${disabled ? 'disabled' : ''}
					>

					<label class="form-check-label" for="${id}">
						${labelText}
					</label>

					<div class="invalid-feedback" aria-live="polite" role="alert">
						You must select an option before submitting.
					</div>
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
		} else {
			const label = `<label for="${name}" class="${floating ? '' : 'form-label'}">${labelText}</label>`;

			html = `
				<div class="mb-3 ${extraClasses}">

				${floating ? '' : label}

				<input placeholder="${placeholder}" name="${name}" type="${type}" class="form-control" id="${name}" value="${value}" ${required ? 'required' : ''}>

				${floating ? label : ''}

					<div class="invalid-feedback" aria-live="polite" role="alert">
						Please provide a valid ${labelText.toLowerCase()}.
					</div>
				</div>
            `;
		}

		this.innerHTML = html;
	}

	validation() {
		const inputEl = this.querySelector('input');
		if (!inputEl) return;

		inputEl.addEventListener('input', () => validateControl(inputEl));
		inputEl.addEventListener('blur', () => validateControl(inputEl));
	}

	get value() {
		const inputEl = this.querySelector('input');
		if (!inputEl) return null;
		if (inputEl.type === 'checkbox') return inputEl.checked;
		return inputEl.value;
	}
}

customElements.define('bs-input', BsInput);