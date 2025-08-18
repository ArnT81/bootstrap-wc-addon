export class BsForm extends HTMLElement {
	connectedCallback() {
		const extraClasses = this.getAttribute('class') || '';
		const id = this.getAttribute('id') || '';

		const shadow = this.attachShadow({ mode: 'open' });

		shadow.innerHTML = `
            <form id="${id}" class="row g-3 needs-validation ${extraClasses}" novalidate>
                <slot></slot>
            </form>
        `;

		const form = shadow.querySelector('form');
		const slot = shadow.querySelector('slot');

		const validate = (form) => {
			const nodes = slot.assignedElements({ flatten: true });

			const controls = nodes.flatMap(node =>
				node.querySelectorAll ? Array.from(node.querySelectorAll('input, select, textarea')) : []
			);

			controls.forEach(el => {
				const feedback = el.parentElement.querySelector('.invalid-feedback');
				if (!el.checkValidity()) {
					el.classList.add('is-invalid');
					el.classList.remove('is-valid');
					el.setAttribute('aria-invalid', 'true');
					if (feedback) feedback.style.display = 'block';
				} else {
					el.classList.remove('is-invalid');
					el.classList.add('is-valid');
					el.removeAttribute('aria-invalid');
					if (feedback) feedback.style.display = 'none';
				}
			});

			const isValid = controls.every(el => el.checkValidity());

			if (!isValid) {
				form.classList.add('was-validated');
				const firstInvalid = controls.find(el => !el.checkValidity());
				if (firstInvalid) firstInvalid.focus();
			}

			return isValid;
		};


		slot.addEventListener('slotchange', () => {
			const nodes = slot.assignedNodes({ flatten: true });

			const addClickListenerToSubmit = (el) => {
				if (el.nodeType !== Node.ELEMENT_NODE) return;

				// Native button
				if (el.tagName === 'BUTTON' && el.type === 'submit') {
					el.addEventListener('click', () => form.requestSubmit());
				}

				// Custom element type="submit"
				if (el.getAttribute && el.getAttribute('type') === 'submit') {
					el.addEventListener('click', () => form.requestSubmit());
				}

				// Check children recursively
				el.children && Array.from(el.children).forEach(addClickListenerToSubmit);
			};

			nodes.forEach(addClickListenerToSubmit);
		});

		form.addEventListener('submit', (e) => {
			e.preventDefault();

			if (!validate(form)) return;

			const submitEvent = new SubmitEvent('submit', {
				bubbles: true,
				cancelable: true,
				composed: true,
				submitter: e.submitter
			});

			this.dispatchEvent(submitEvent);
		});
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-form", BsForm) })