class Navbar extends HTMLElement {
	connectedCallback() {
		let links = [];
		try { links = JSON.parse(this.getAttribute("links") || "[]") }
		catch (e) { console.error("Invalid JSON in links attribute", e) }

		const brand = this.getAttribute("brand") || ""
		const focusColor = this.getAttribute("focus-color") || ""

		this.innerHTML = `
			<style>
				.navbar-toggler:focus {
					box-shadow:  ${focusColor ? `0 0 0 0.15rem ${focusColor}` : "none"};
				}

				.btn-close:focus {
					box-shadow:  ${focusColor ? `0 0 0 0.15rem ${focusColor}` : "none"};
				}


			</style>

			<nav class="navbar fixed-top position-relative">
				<div class="container-fluid">
					<div class="navbar-brand">${brand}</div>

					<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
					style="border-color: inherit;"
					data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
						<svg
							width="30"
							height="30"
							viewBox="0 0 30 30"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								stroke-linecap='round'
								stroke-miterlimit='10'
								stroke-width='2'
								stroke='currentColor'
								d='M4 7h22M4 15h22M4 23h22'
							/>
						</svg>
					</button>

					<div class="offcanvas offcanvas-end show" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div class="offcanvas-header">
							<a class="nav-link" aria-current="page" href="#home">
								<h5 class="offcanvas-title" id="offcanvasNavbarLabel">${brand}</h5>
							</a>

							<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="close">
								<svg
									style="position: relative;  top: -5px;"
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 16 16'
									fill='currentColor'
								>
									<path
										d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414'
									/>
								</svg>
							</button>
						</div>

						<div class="offcanvas-body">
							<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
								${links.map(link => `
									<li><a class="nav-link" href="${link.href}" style="color: inherit;">${link.label}</a></li>
								`).join("")}
							</ul>
						</div>
					</div>
				</div>
			</nav>
        `;

		/* TODO fix active class on Home when index.html is shown */
		const updateActiveLink = () => {
			const currentUrl = window.location.href;
			console.log(currentUrl);
			this.querySelectorAll('a.nav-link').forEach(a => {
				const linkUrl = new URL(a.href, window.location.origin).href;
				if (currentUrl === linkUrl) {
					console.log(currentUrl ,linkUrl);

					a.classList.add('active');
				} else {
					a.classList.remove('active');
				}
			});
		};

		// Kör direkt när komponenten laddas
		updateActiveLink();

		// Lyssna på hashändringar (för single-page navigering)
		window.addEventListener('hashchange', updateActiveLink);

		// Lyssna på popstate (framåt/bakåt navigation utan reload i SPA-läge)
		window.addEventListener('popstate', updateActiveLink);
	}

	documentation() {
		return {
			"tag name": "bs-navbar",
			description: "Bootstrap Offcanvas navbar.",
			requirements: {
				"bootstrap.min.css": "<link href=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css\" rel=\"stylesheet\" integrity=\"sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr\" crossorigin=\"anonymous\">",
				"bootstrap.bundle.min.js": "<script src=\"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js\"></script>"
			},
			attributes: {
				links: {
					"description": "Links to display in the \"offcanvas-body\"",
					"type": "JSON array of link objects with \"href\" and \"label\".",
					"example": "links='[{\"href\": \"#home\", \"label\": \"Home\"}, {\"href\": \"#about\", \"label\": \"About\"}]'",
					"default": "[]"
				},
				brand: {
					"description": "Brand name displayed in the navbar & offcanvas.",
					"type": "String",
					"example": "brand=\"My company name\"",
					"default": "My company name"
				},
				"focus-color": {
					"description": "Color for focus state of toggler and close button.",
					"type": "String (CSS color value)",
					"example": "focus-color=\"green\"",
					"default": "none"
				}
			}
		}
	}
}

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-navbar", Navbar) })