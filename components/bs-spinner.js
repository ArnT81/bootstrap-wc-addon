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


	documentation() {
		return {
			"tag name": "bs-spinner",
			description: "A Bootstrap spinner web component for indicating loading state.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\">"
			},
			attributes: {
				type: {
					description: "Color of the spinner, maps to Bootstrap text color classes.",
					type: "string",
					alternatives: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
					example: "<bs-spinner type='danger'></bs-spinner>",
					default: "primary"
				},
				variant: {
					description: "Spinner variant, either border or grow.",
					type: "string",
					alternatives: ["border", "grow"],
					example: "<bs-spinner variant='grow'></bs-spinner>",
					default: "border"
				},
				size: {
					description: "Custom size of the spinner. Can be any CSS unit (px, rem, em, etc.). Leave empty for default size.",
					type: "string",
					example: "<bs-spinner size='3rem'></bs-spinner>",
					default: ""
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-spinner", Spinner) })