export class BsCarousel extends HTMLElement {
	connectedCallback() {
		let images = [];
		try { images = JSON.parse(this.getAttribute("images") || "[]") }
		catch (e) { console.error("Invalid JSON in images attribute", e) }

		const autoplay = this.getAttribute('autoplay') !== null ? 'true' : 'false';
		const indicators = this.getAttribute('indicators') !== null ? 'true' : 'false';
		const controls = this.getAttribute('controls') !== null ? 'true' : 'false';
		const height = this.getAttribute('height') || '100%';
		const width = this.getAttribute('width') || '100%';
		const extraClasses = this.getAttribute('class') || '';


		this.innerHTML = `
			<style>
				.carousel-caption h5, .carousel-caption p {
					text-shadow: 0 0 2px black, 0 0 2px black, 0 0 8px black, 0 0 12px black, 0 0 12px black;
				}
				.carousel-inner img {
					width: 100%;
					object-fit: cover;
				}
			</style>

			<div
				id="carouselExampleIndicators"
				style="width: ${width};
				class="carousel slide ${extraClasses}"
				data-bs-ride="${autoplay}"
			>
			${indicators === "true" && `
				<div class="carousel-indicators">
					${images.map((_, i) => `
						<button
						type="button"
							data-bs-target="#carouselExampleIndicators"
							data-bs-slide-to="${i}"
							${i === 0 ? 'class="active" aria-current="true"' : ''}
							aria-label="Slide ${i + 1}"
						></button>
					`).join('')}
				</div>
			`}
				<div class="carousel-inner">
					${images.map((image, i) => `
						<div
							class="carousel-item ${i === 0 ? 'active' : ''}"
							data-bs-interval="${image.interval || ""}"
						>
							<img
								style="height: ${height};"
								src="${image.src}"
								alt="${image.alt}"
								class="d-block"
							>
							${(image.caption?.label || image.caption?.content) ? `
								<div
									class="carousel-caption d-none d-md-block"
									style="color: inherit;"
								>
									${image.caption.label ? `<h5>${image.caption.label}</h5>` : ""}
									${image.caption.content ? `<p>${image.caption.content}</p>` : ""}
								</div>
							`: ""}
						</div>
					`).join('')}
				</div>

				${controls === "true" && `
					<button
						class="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev"
					>
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>

						<span class="visually-hidden">Previous</span>
					</button>

					<button
						class="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next"
					>
						<span class="carousel-control-next-icon" aria-hidden="true"></span>

						<span class="visually-hidden">Next</span>
					</button>
				`}
			</div>
		`;

		const button = this.querySelector('button');

		button && button.addEventListener('click', () => {
			this.dispatchEvent(new CustomEvent('btn-click'));
		});
	}


	documentation() {
		return {
			"tag name": "bs-carousel",
			description: "A custom Bootstrap 5-based carousel supporting images, captions, controls, and indicators.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr\" crossorigin=\"anonymous\">",
				"bootstrap.bundle.min.js": "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js\"></script>"
			},
			attributes: {
				images: {
					"description": "JSON array of image objects, optionally including captions.",
					"type": "string (JSON)",
					"example": `<bs-carousel images='[{"src":"img1.jpg","alt":"Image 1"},{"src":"img2.jpg","alt":"Image 2"}]'></bs-carousel>`,
					"default": "[]"
				},
				autoplay: {
					"description": "Enables automatic sliding (Bootstrap `data-bs-ride`).",
					"type": "boolean (attribute without value)",
					"example": "<bs-carousel autoplay></bs-carousel>",
					"default": false
				},
				indicators: {
					"description": "Show or hide the indicator dots.",
					"type": "boolean (attribute without value)",
					"example": "<bs-carousel indicators></bs-carousel>",
					"default": false
				},
				controls: {
					"description": "Show or hide the previous/next controls.",
					"type": "boolean (attribute without value)",
					"example": "<bs-carousel controls></bs-carousel>",
					"default": false
				},
				height: {
					"description": "CSS height applied to carousel images.",
					"type": "string (any valid CSS size)",
					"example": "<bs-carousel height=\"300px\"></bs-carousel>",
					"default": "100%"
				},
				width: {
					"description": "CSS width applied to the carousel container.",
					"type": "string (any valid CSS size or percentage)",
					"example": "<bs-carousel width=\"800px\"></bs-carousel>",
					"default": "100%"
				},
				class: {
					"description": "Extra CSS classes to add to the carousel container.",
					"type": "string",
					"example": "<bs-carousel class=\"shadow-lg\"></bs-carousel>",
					"default": ""
				}
			},
			events: {
				"btn-click": {
					"description": "Fired when a button inside the carousel is clicked.",
					"detail": "No additional data is passed with this event."
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-carousel", BsCarousel) })