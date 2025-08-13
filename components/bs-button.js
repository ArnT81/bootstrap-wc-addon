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

	documentation() {
		return {
			"tag name": "bs-button",
			description: "Bootstrap Button.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr\" crossorigin=\"anonymous\">",
				"bootstrap.bundle.min.js": "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js\"></script>"
			},
			attributes: {
				type: {
					"description": "HTML button type.",
					"type": "string",
					"alternatives": ["button", "submit", "reset"],
					"example": "<bs-button type=\"submit\" variant=\"primary\" label=\"Send\" size=\"lg\" disabled>",
					"default": "button"
				},
				variant: {
					"description": "",
					"type": "string",
					"alternatives": [
						"primary",
						"secondary",
						"success",
						"danger",
						"warning",
						"info",
						"light",
						"dark",
						"link"
					],
					"example": "<bs-button type=\"submit\" variant=\"primary\" label=\"Send\" size=\"lg\" disabled>",
					"default": "button"
				},
				size: {
					"description": "Larger/smaller button.",
					"type": "string",
					"alternatives": ["sm", "lg"],
					"example": "<bs-button type=\"submit\" variant=\"primary\" label=\"Send\" size=\"lg\" disabled>",
					"default": "\"\" (normal size)"
				},
				label: {
					"description": "Button text",
					"type": "string",
					"example": "<bs-button type=\"submit\" variant=\"primary\" label=\"Send\" size=\"lg\" disabled>",
					"default": "own innerHTML"
				},
				disabled: {
					"description": "Disables button",
					"type": "boolean",
					"example": "<bs-button type=\"submit\" variant=\"primary\" label=\"Send\" size=\"lg\" disabled>",
					"default": false
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-button", Button) })