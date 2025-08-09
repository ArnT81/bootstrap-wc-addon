class Tooltip extends HTMLElement {
	connectedCallback() {
		const variant = this.getAttribute('variant') || 'secondary';
		const title = this.getAttribute('title') || 'add title prop';
		const text = this.getAttribute('text') || 'add text prop';
		const placement = this.getAttribute('placement') || 'top';

		this.innerHTML = `
            <button type="button" class="btn btn-${variant}" data-bs-toggle="tooltip" data-bs-placement="${placement}" title="${title}">
                ${text}
            </button>
        `;

		const tooltipBtn = this.querySelector('button');
console.log(tooltipBtn);

		// Initiera Bootstrap tooltip på den här knappen
		// const tooltipInstance = new bootstrap.Tooltip(tooltipBtn);

		// Eventlistener om du vill lyssna på hover
		tooltipBtn.addEventListener('mouseover', () => {
			this.dispatchEvent(new CustomEvent('mouseover'));
		});
	}
}

// Registrera custom element
customElements.define('my-tooltip', Tooltip);
