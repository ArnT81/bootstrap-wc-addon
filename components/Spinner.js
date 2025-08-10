class Spinner extends HTMLElement {
	connectedCallback() {
		const color = this.getAttribute('type') || 'primary';
		const variant = this.getAttribute('variant') || 'border';
		const size = this.getAttribute('size') || '';

		this.innerHTML = `
			<div class="spinner-${variant} text-${color}" style="width: ${size}; height: ${size};" role="status">
				<span class="visually-hidden">Loading...</span>
			</div>
		`;
	}


}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-spinner", Spinner) })