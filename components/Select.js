class Select extends HTMLElement {
	connectedCallback() {
		let options = [];
		try { options = JSON.parse(this.getAttribute("options") || "[]") }
		catch (e) { console.error("Invalid JSON in options attribute", e) }

		const disabled = this.getAttribute('disabled') !== null ? 'disabled' : '';
		const id = this.getAttribute('id') || '';
		const name = this.getAttribute('name') || '';
		const extraClasses = this.getAttribute('class') || '';

		this.innerHTML = `
			<select name="${name}" id="${id}" class="form-select ${extraClasses}" aria-label="form-select" ${disabled}>
				${options.map(option => `
					<option value="${option.value}" ${option.selected && 'selected'}>${option.label}</option>
				`).join("")}
			</select>
		`;

		const select = this.querySelector('select');

		select.addEventListener('change', (e) => {
			this.dispatchEvent(new CustomEvent('change', {
				detail: { value: e.target.value },
				bubbles: true,
				composed: true
			}));
		});
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-select", Select) })