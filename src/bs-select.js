export class BsSelect extends HTMLElement {
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


	documentation() {
		return {
			"tag name": "bs-select",
			description: "A Bootstrap-styled select dropdown web component.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\">"
			},
			attributes: {
				options: {
					description: "Array of option objects. Each object can have `value`, `label`, and optional `selected` boolean.",
					type: "JSON array",
					example: `options='[{"value":"1","label":"One"},{"value":"2","label":"Two","selected":true}]'`,
					default: "[]"
				},
				disabled: {
					description: "Disable the select element if present.",
					type: "boolean (presence-based)",
					example: "<bs-select disabled></bs-select>",
					default: false
				},
				id: {
					description: "HTML id attribute for the select element.",
					type: "string",
					example: "<bs-select id='mySelect'></bs-select>",
					default: ""
				},
				name: {
					description: "HTML name attribute for the select element, used in forms.",
					type: "string",
					example: "<bs-select name='options'></bs-select>",
					default: ""
				},
				class: {
					description: "Extra CSS classes to apply to the select element.",
					type: "string",
					example: "<bs-select class='your-classname'></bs-select>",
					default: ""
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-select", BsSelect) })