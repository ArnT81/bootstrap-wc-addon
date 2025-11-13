import { validateControl } from "./shared.js";


export class BsSelect extends HTMLElement {
	connectedCallback() {
		let options = [];
		try { options = JSON.parse(this.getAttribute("options") || "[]") }
		catch (e) { console.error("Invalid JSON in options attribute", e) }

		const disabled = this.getAttribute('disabled') !== null ? 'disabled' : '';
		const id = this.getAttribute('id') || '';
		const name = this.getAttribute('name') || '';
		const label = this.getAttribute('label') || '';
		const required = this.hasAttribute('required');
		const extraClasses = this.getAttribute('class') || '';
		const placeholder = this.getAttribute('placeholder') || '';
		const errorMessage = this.getAttribute('error') || '';


		this.innerHTML = `
			<div class="mb-3 ${extraClasses}">
				<label for="${name}" class="form-label">${label}</label>

				<select name="${name}" id="${id}" class="form-select" aria-label="form-select-${name}" ${required ? 'required' : ''} ${disabled}>
					${placeholder ? `<option value="" selected disabled hidden>${placeholder}</option>` : ''}

					${options.map(option => `
						<option value="${option.value}" ${option.selected && 'selected'}>${option.label}</option>
					`).join("")}
				</select>

				<div class="invalid-feedback" aria-live="polite" role="alert">
                    ${errorMessage || "You must select an option before submitting"}
                </div>
			</div>
		`;

		const select = this.querySelector('select');

		select.addEventListener('blur', () => validateControl(select));
		select.addEventListener('change', (e) => {
			validateControl(select)

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
					description: "Extra CSS classes (applies to the wrapper of select element).",
					type: "string",
					example: "<bs-select class='your-classname'></bs-select>",
					default: ""
				},
				required: {
					description: "",
					type: "Boolean (presence-based)",
					example: "<bs-select required></bs-select>",
					default: "false"
				},
				label: {
					description: "Text label displayed for the select",
					type: "string",
					example: "<bs-select label=\"Sex\"></bs-select>",
					default: ""
				},
				placeholder: {
					description: "Text label displayed for the select",
					type: "string (presence-based, not shown if not provided)",
					example: "<bs-select placeholder=\"Välj ett alternativ\"></bs-select>",
					default: ""
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-select", BsSelect) })