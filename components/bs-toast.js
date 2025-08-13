const icons = {
	warning: `<path fill-rule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />`,
	info: `<path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />`
}


const colors = {
	warning: 'warning',
	info: 'primary',
}


class Toast extends HTMLElement {
	connectedCallback() {
		const title = this.getAttribute('title') || 'Titel saknas';
		const text = this.getAttribute('text') || 'Text saknas';
		const variant = this.getAttribute('variant') || 'info';
		const extraClasses = this.getAttribute('class') || '';
		const duration = this.getAttribute('duration') || 3000;


		this.innerHTML = `
            <div id="myToast" class="toast-container position-fixed bottom-0 end-0 p-3 ${extraClasses}">
                <div
					class="toast text-bg-${colors[variant]}"
					role="alert"
					aria-live="assertive"
					aria-atomic="true"
					data-bs-delay="${duration}"
				>
                    <div class="toast-header">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 26 26"
							strokeWidth={1.5}
							stroke="currentColor"
							style="width: 26px; height: 26px;"
						>
							${icons[variant]}
						</svg>

                        <strong class="me-auto">${title}</strong>

						<button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>

                    <div class="toast-body">${text}</div>
                </div>
            </div>
        `;


		const toastEl = this.querySelector('.toast');
		this.toastInstance = new bootstrap.Toast(toastEl);


		if (this.hasAttribute('autoplay')) this.showToast();
	}


	showToast() { if (this.toastInstance) this.toastInstance.show() }

	setToastContent({ title, text, variant }) {
		if (title) this.querySelector('.me-auto').textContent = title;
		if (text) this.querySelector('.toast-body').textContent = text;
		if (variant) {
			const toastEl = this.querySelector('.toast');
			toastEl.className = `toast text-bg-${variant}`;
		}
	}


	documentation() {
		return {
			"tag name": "bs-toast",
			description: "A Bootstrap toast notification component.",
			requirements: {
				"bootstrap.min.css": "<link href='https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css' rel='stylesheet'>",
				"bootstrap.bundle.min.js": "<script src='https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js'></script>"
			},
			attributes: {
				title: {
					description: "The title displayed in the toast header.",
					type: "string",
					example: "<bs-toast title='Warning'></bs-toast>",
					default: "Titel saknas"
				},
				text: {
					description: "The body text of the toast.",
					type: "string",
					example: "<bs-toast text='Something happened'></bs-toast>",
					default: "Text saknas"
				},
				variant: {
					description: "Bootstrap color variant for the toast background.",
					type: "string",
					alternatives: ["info", "warning", "success", "danger", "primary", "secondary", "light", "dark"],
					example: "<bs-toast variant='warning'></bs-toast>",
					default: "info"
				},
				class: {
					description: "Additional CSS classes for custom styling.",
					type: "string",
					example: "<bs-toast class='your-classname'></bs-toast>",
					default: ""
				},
				duration: {
					description: "Time in milliseconds the toast stays visible before auto-dismiss.",
					type: "number",
					example: "<bs-toast duration='5000'></bs-toast>",
					default: 3000
				},
				autoplay: {
					description: "When present, the toast will show automatically on page load.",
					type: "boolean",
					example: "<bs-toast autoplay></bs-toast>",
					default: false
				}
			},
			accessibility: {
				role: "alert",
				ariaLive: "assertive",
				ariaAtomic: true,
				description: "Provides live notification feedback to assistive technologies.",
				closeButton: {
					ariaLabel: "Close",
					description: "Button to dismiss the toast."
				}
			},
			methods: {
				showToast: "Programmatically show the toast.",
				setToastContent: "Update title, text, and variant dynamically. Accepts an object: { title, text, variant }"
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define('bs-toast', Toast) })