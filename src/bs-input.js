import { validateControl } from "./shared.js";

class BsInput extends HTMLElement {
	connectedCallback() {
		this.render();
		this.validation();
	}

	render() {
		const type = this.getAttribute('type') || 'text';
		const name = this.getAttribute('name') || '';
		const label = this.getAttribute('label') || '';
		const required = this.hasAttribute('required');
		const value = this.getAttribute('value') || '';
		const extraClasses = this.getAttribute('class') || '';


		let html = '';

		if (type === 'checkbox') {
			html = `
                <div class="form-check ${extraClasses}">
                    <input name="${name}" type="checkbox" class="form-check-input" id="${name}" ${required ? 'required' : ''}>

					<label class="form-check-label" for="${name}">${label}</label>

					<div class="invalid-feedback" aria-live="polite" role="alert">
                        You must agree before submitting.
                    </div>
                </div>
            `;
		} else if (type === 'text') {
			html = `
			<div class="${extraClasses}">
                <label for="${name}" class="form-label">${label}</label>

				<input name="${name}" type="${type}" class="form-control" id="${name}" value="${value}" ${required ? 'required' : ''}>

				<div class="invalid-feedback" aria-live="polite" role="alert">
                    Please provide a valid ${label.toLowerCase()}.
                </div>
			</div>
            `;
		} else return null

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