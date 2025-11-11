import { validateControl } from "./shared.js";

export class BsAccordion extends HTMLElement {
	connectedCallback() {
		let items = [];
		try { items = JSON.parse(this.getAttribute("items") || "[]") }
		catch (e) { console.error("Invalid JSON in items attribute", e) }

		const id = this.getAttribute("id") || "accordion-" + Math.random().toString(36).substring(2, 9);
		const label = this.getAttribute("label") || "";
		const extraClasses = this.getAttribute("class") || "";
		const openIndex = parseInt(this.getAttribute("openindex") || " ");


		this.innerHTML = `
			<div class="accordion ${extraClasses}" id="${id}">
				${label ? `<h2 class="mb-2">${label}</h2>` : ""}
				${items.map((item, index) => `
					<div class="accordion-item">
						<h3 class="accordion-header" id="heading-${id}-${index}">
							<button class="accordion-button ${index === openIndex ? "" : "collapsed"}"
								type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapse-${id}-${index}"
								aria-expanded="${index === openIndex}"
								aria-controls="collapse-${id}-${index}">
								${item.title || `Accordion Item #${index + 1}`}
							</button>
						</h3>
						<div id="collapse-${id}-${index}"
							class="accordion-collapse collapse ${index === openIndex ? "show" : ""}"
							data-bs-parent="#${id}">
							<div class="accordion-body">
								<p style="margin-bottom: 0;">${item.content || ""}</p>
							</div>
						</div>
					</div>
				`).join("")}
			</div>
		`;

		// Event delegation: listen for Bootstrap collapse events
		this.addEventListener("shown.bs.collapse", (event) => {
			const index = Array.from(this.querySelectorAll(".accordion-collapse")).indexOf(event.target);
			this.dispatchEvent(new CustomEvent("accordionChange", {
				detail: { index },
				bubbles: true,
				composed: true
			}));
		});
	}

	documentation() {
		return {
			"tag name": "bs-accordion",
			description: "A Bootstrap-styled accordion web component.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\">",
				"bootstrap.bundle.min.js": "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js\"></script>"
			},
			attributes: {
				items: {
					description: "Array of accordion items. Each item has `title` and `content`.",
					type: "JSON array",
					example: `items='[{"title":"Section 1","content":"Content 1"},{"title":"Section 2","content":"Content 2"}]'`,
					default: "[]"
				},
				id: {
					description: "Unique id for the accordion container.",
					type: "string",
					example: "<bs-accordion id='myAccordion'></bs-accordion>",
					default: "auto-generated"
				},
				class: {
					description: "Extra CSS classes for the outer accordion element.",
					type: "string",
					example: "<bs-accordion class='mb-4 shadow-sm'></bs-accordion>",
					default: ""
				},
				label: {
					description: "Optional heading text shown above the accordion.",
					type: "string",
					example: "<bs-accordion label='FAQ'></bs-accordion>",
					default: ""
				},
				openindex: {
					description: "Index of accordion item to open by default.",
					type: "number",
					example: "<bs-accordion openindex='1'></bs-accordion>",
					default: "0"
				}
			},
			events: {
				accordionChange: {
					description: "Fired when a new accordion item is opened.",
					detail: "{ index: number }"
				}
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", () => { customElements.define("bs-accordion", BsAccordion) });