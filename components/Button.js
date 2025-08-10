class Button extends HTMLElement {

	connectedCallback() {
		const type = this.getAttribute('type') || 'button';
		const variant = this.getAttribute('variant') || '';
		const size = this.getAttribute('size') || '';
		const label = this.getAttribute('label') || this.innerHTML.trim();
		const disabled = this.hasAttribute('disabled') ? 'disabled' : '';


		this.innerHTML = `
			<button type="${type}" class="btn btn-${variant} btn-${size}" ${disabled}>
				${label}
			</button>
		`;

		const button = this.querySelector('button');

		button.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('btn-click'));
		});
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-button", Button) })