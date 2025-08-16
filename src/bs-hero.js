export class BsHero extends HTMLElement {
	connectedCallback() {
		let mediaHtml = '';
		const title = this.getAttribute('title') || '';
		const subtitle = this.getAttribute('subtitle') || '';
		const background = this.getAttribute('background') || '';
		const textColor = this.getAttribute('text-color') || 'light';
		const extraClasses = this.getAttribute('class') || '';
		const navHeight = document.querySelector("nav")?.clientHeight || 0;
		const sectionHeight = this.getAttribute('height') || `calc(100vh - ${navHeight}px)`;


		if (background.endsWith('.mp4')) {
			// Video
			mediaHtml = `
				<video autoplay muted loop playsinline class="w-100 h-100 object-fit-cover position-absolute top-0 start-0">
					<source src="${background}" type="video/mp4">
					Din webbläsare stöder inte videon.
				</video>
			`;
		} else if (background) {
			// Image
			mediaHtml = `
				<div class="position-absolute top-0 start-0 w-100 h-100"
					style="background: url('${background}') center/cover no-repeat;">
				</div>
			`;
		}

		this.innerHTML = `
			<section id="hero" class="position-relative d-flex flex-column justify-content-center align-items-center text-${textColor} ${extraClasses}" style="height: ${sectionHeight};); overflow: hidden;">
				${mediaHtml}
				<div class="position-relative text-center">
					${title ? `<h1 class="display-1">${title}</h1>` : ''}
					${subtitle ? `<p class="h3 mt-3">${subtitle}</p>` : ''}
				</div>
			</section>
		`;
	}


	documentation() {
		return {
			"tag name": "bs-navbar",
			description: "Bootstrap Offcanvas navbar.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr\" crossorigin=\"anonymous\">"
			},
			attributes: {
				title: {
					"description": "Main headline text displayed in the hero.",
					"type": "string",
					"default": ""
				},
				subtitle: {
					"description": "Optional subheadline text displayed below the title.",
					"type": "string",
					"default": ""
				},
				background: {
					"description": "URL of the background media. If it ends with '.mp4', it will render as a looping video. Otherwise, it will be treated as an image URL.",
					"type": "string",
					"default": ""
				},
				"text-color": {
					"description": "Text color applied to title and subtitle. Uses Bootstrap text color classes.",
					"type": "string",
					"alternatives": ["light", "dark", "primary", "secondary", "success", "danger", "warning", "info", "body", "muted", "white"],
					"default": "light"
				},
				class: {
					"description": "Additional CSS classes to apply to the hero container.",
					"type": "string",
					"default": ""
				},
				height: {
					"description": "Height of hero.",
					"type": "string",
					"default": "100vh - nav height"
				}
			},
			examples: [
				{
					"description": "Hero with image background",
					"usage": "<bs-hero title='Welcome!' subtitle='Explore our site' background='hero.jpg' text-color='light'></bs-hero>"
				},
				{
					"description": "Hero with looping video background",
					"usage": "<bs-hero title='Watch this' subtitle='Cool video hero' background='hero.mp4' text-color='dark'></bs-hero>"
				}
			],
			notes: [
				"The hero height is calculated automatically to subtract the navbar height, if a <nav> element exists.",
				"Video backgrounds autoplay, loop, are muted, and play inline.",
				"Text content is wrapped in a position-relative div to appear above the media."
			]
		}
	}
}

document.addEventListener('DOMContentLoaded', () => customElements.define('bs-hero', BsHero));