export class BsDropdown extends HTMLElement {
	connectedCallback() {
		const label = this.getAttribute('label') || 'label';
		const variant = this.getAttribute('variant') || 'primary';
		const extraClasses = this.getAttribute('class') || '';
		const menuClasses = this.getAttribute('menu-class') || '';
		const size = this.getAttribute('size') || ''; //sm, lg
		const id = this.getAttribute('id') || '';
		const glossy = this.hasAttribute('glossy');


		const children = Array.from(this.children);

		children.forEach(child => {
			if (child.tagName.toLowerCase() === 'li') {
				console.warn('BsDropdown: You do not need to wrap dropdown children in <li>, the component adds it automatically.');
			};

			if (!child.classList.contains('dropdown-item')) {
				child.classList.add('dropdown-item');
			}
		});

		const listItems = children.map(child => `<li>${child.outerHTML}</li>`).join('');

		this.innerHTML = `
			<style>
				.dropdown-menu {
					background-color: transparent;
					background-color: ${glossy ? `hsl(from var(--foreground-color) h s l / 0.15)` : `var(--background-color)`};
					border-color: hsl(from var(--foreground-color) h s l / 0.6);
				}
				.dropdown-menu * {
					color: ${glossy ? `hsl(from var(--background-color) h s l / 1)` : `var(--foreground-color)`};
				}
				${glossy && `
					.dropdown-menu .dropdown-item:hover {
						background-color: hsl(from var(--foreground-color) h s l / 0.5);
						color: var(--background-color);
					}
					.dropdown-menu::after {
						content: "";
						position: absolute;
						inset: 0;
						backdrop-filter: blur(16px) saturate(180%);
						-webkit-backdrop-filter: blur(16px) saturate(180%);
						z-index: -1;
						pointer-events: none;
						background-color: inherit;
						border-radius: var(--bs-dropdown-border-radius)
					}
				`}
			</style>

			<div ${id && `id=${id}`} class="dropdown ${extraClasses}">
				<button class="btn btn-${variant} ${size && `btn-${size}`} dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
					${label}
				</button>

				<ul class="dropdown-menu ${menuClasses}">
					${listItems}
				</ul>
			</div>
		`;
	}

	documentation() {
		return {
			"tag name": "bs-dropdown",
			description: "A Bootstrap dropdown web component.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\">",
				"bootstrap.bundle.min.js": "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js\"></script>"
			},
			attributes: {
				label: {
					description: "Button label for the dropdown.",
					type: "string",
					example: "<bs-dropdown label='Actions'></bs-dropdown>",
					default: "Dropdown"
				},
				variant: {
					description: "Bootstrap button variant.",
					type: "string",
					alternatives: ["primary", "secondary", "success", "danger", "warning", "info", "light", "dark"],
					example: "<bs-dropdown variant='danger'></bs-dropdown>",
					default: "primary"
				},
				children: {
					description: "Content placed inside the <bs-dropdown> element becomes dropdown menu items. Each child element is automatically given the `dropdown-item` class and wrapped in a `<li>` element. Avoid wrapping children manually in `<li>` tags.",
					type: "HTMLElement[]",
					example: "<bs-dropdown><div>Item 1</div><button>Item 2</button></bs-dropdown>",
					default: "No children (empty dropdown menu)"
				},
				size: {
					description: "Bootstrap button size. Maps to `btn-sm` or `btn-lg` classes. Leave empty for default size.",
					type: "string",
					alternatives: ["sm", "lg"],
					example: "<bs-dropdown size='lg'></bs-dropdown>",
					default: ""
				},
				extraClasses: {
					description: "Extra CSS classes to apply to the dropdown wrapper `<div>` for custom styling.",
					type: "string",
					example: "<bs-dropdown class='my-custom-class another-class'></bs-dropdown>",
					default: ""
				},
				id: {
					description: "Sets the HTML id attribute on the dropdown wrapper `<div>`, allowing direct DOM selection or integration with external scripts.",
					type: "string",
					example: "<bs-dropdown id='user-menu'></bs-dropdown>",
					default: ""
				},
				glossy: {
					description: "Enables a glossy, semi-transparent visual style for the dropdown menu. Activated by adding the glossy attribute to the component. Applies blur/saturate effects and adjusted background/foreground colors.",
					type: "boolean (presence-based)",
					example: "<bs-dropdown glossy></bs-dropdown>",
					default: false
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	customElements.define("bs-dropdown", BsDropdown);
});