export class BsNavbar extends HTMLElement {
	connectedCallback() {
		let links = [];
		const root = document.documentElement;
		const navbarHeight = getComputedStyle(root).getPropertyValue('--navbar-height').trim();

		try { links = JSON.parse(this.getAttribute("links") || "[]") }
		catch (e) { console.error("Invalid JSON in links attribute", e) }
		const brand = this.getAttribute("brand") || ""
		const focusColor = this.getAttribute("focus-color") || ""
		const position = this.getAttribute("position") || "sticky-top";

		let resolvedColor = focusColor;
		const bsColor = getComputedStyle(document.documentElement)
			.getPropertyValue(`--bs-${focusColor}`)
			.trim();


		if (bsColor) resolvedColor = bsColor;


		this.innerHTML = `
			<style>
				.offcanvas {
					background-color: inherit;
					backdrop-filter: blur(16px) saturate(180%);
					-webkit-backdrop-filter: blur(16px) saturate(180%);
				}
				.offcanvas-header {
					background-color: inherit;
					padding-block: unset;
					height: ${navbarHeight};
				}
				.navbar {
					padding-inline: 16px;
				}
				.navbar::after {
					content: "";
					position: absolute;
					inset: 0;
					backdrop-filter: blur(16px) saturate(180%);
					-webkit-backdrop-filter: blur(16px) saturate(180%);
					z-index: -1; /* ligger bakom innehållet */
					pointer-events: none;
					background-color: inherit;
				}
				.navbar-toggler:focus {
					box-shadow:  ${resolvedColor ? `0 0 0 0.20rem ${resolvedColor}` : "none"};
				}
				.btn-close:focus {
					box-shadow:  ${resolvedColor ? `0 0 0 0.15rem ${resolvedColor}` : "none"};
				}
				.dropdown-menu {
					background-color: inherit;
					border-color: inherit;
				}
			</style>

			<nav class="navbar ${position}">
				<div class="navbar-brand">${brand}</div>

				<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
				style="border-color: inherit;"
				data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
				>
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

				<div
					class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
					style="max-width: 85vw; background-color: inherit; "
				>
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
							${links.map(link => {
			const entries = Object.entries(link);
			// dropdown/link
			if (entries.length === 1 && Array.isArray(entries[0][1])) {
				const [dropdownLabel, subLinks] = entries[0];
				return `
							<li class="nav-item dropdown">
								<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="color: inherit;">
									${dropdownLabel}
								</a>
								<ul
									class="dropdown-menu"
									data-bs-dismiss="offcanvas"
								>
									${subLinks.map(sub => `
										<li	class="nav-item">
											<a
												class="nav-link ps-3"
												href="${sub.href}"
												target="${sub.target || ""}"
												style="color: inherit;"
											>
											${sub.label}
											</a>
										</li>
									`).join("")}
								</ul>
							</li>
						`;
			}
			return `
							<li
								class="nav-item"
								data-bs-dismiss="offcanvas"
							>
								<a
									class="nav-link"
									href="${link.href}"
									target="${link.target || ""}"
									style="color: inherit;"
								>
								${link.label}
								</a>
							</li>`}).join("")}
						</ul>
					</div>
				</div>
			</nav>
        `;


		const updateActiveLinkOnScroll = () => {
			const navLinks = document.querySelectorAll("nav a[href^='#']:not([href='#'])");

			const targets = Array.from(navLinks)
				.map(link => document.querySelector(link.getAttribute("href")))
				.filter(el => el !== null);

			const setActive = () => {
				let topMost = null;
				let minTop = window.innerHeight;

				targets.forEach(target => {
					const rect = target.getBoundingClientRect();

					if (rect.top >= 0 && rect.top < minTop) {
						// closest to the top but still in the viewport
						minTop = rect.top;
						topMost = target;
					}
				});

				// if nothing is found in viewport → take the last one above
				if (!topMost) {
					const above = targets.filter(t => t.getBoundingClientRect().top < 0);
					if (above.length > 0) {
						topMost = above[above.length - 1];
					}
				}

				if (topMost) {
					document.querySelectorAll("nav .active").forEach(el => el.classList.remove("active"));
					const activeLink = document.querySelector(`nav a[href="#${topMost.id}"]`);
					if (activeLink) {
						addActiveClass(activeLink);
						addActiveClassToParentDropdown(activeLink);
					}
				}
			};

			const observer = new IntersectionObserver(() => {
				setActive(); // recalculate every time IO triggers
			}, {
				threshold: [0, 0.1, 0.5, 1], // more triggers
			});

			targets.forEach(target => observer.observe(target));

			// run once immediately
			setActive();
		};

		const compensateForStickyBehavior = () => {
			document.querySelector("html").style.scrollPaddingTop = `${this.offsetHeight}px`;
			document.querySelector("header")?.style?.setProperty("display", "contents");
			document.querySelector(".navbar").style.top = "0";
		}

		if (position.includes("sticky")) compensateForStickyBehavior();
		const addActiveClass = (el) => el.classList.add('active');

		const normalizeUrl = url => {
			let u = new URL(url, window.location.origin);
			if (u.pathname === "/index.html") {
				u.pathname = "/";
			}
			return u.href;
		};

		const addActiveClassToParentDropdown = (el) => {
			if (!el.closest('.dropdown')) return;

			el.closest('.dropdown').classList.add("active")
		};

		const updateActiveLink = () => {
			const currentUrl = normalizeUrl(window.location.href);
			const currentHash = window.location.hash;

			this.querySelectorAll('.active').forEach(el => el.classList.remove('active'));

			this.querySelectorAll('a.nav-link').forEach(a => {
				const linkUrl = normalizeUrl(a.href);
				const linkHash = new URL(a.href, window.location.origin).hash;

				if ((currentHash && currentHash === linkHash) ||
					(!currentHash && currentUrl === linkUrl)) {
					addActiveClass(a);
					addActiveClassToParentDropdown(a);
				}
			});
		};

		// On load
		updateActiveLink();
		updateActiveLinkOnScroll();

		// Single-page navigation
		window.addEventListener("hashchange", updateActiveLink);
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
					"type": "JSON array of link objects with \"href\", \"label\" & target if provided.",
					"example": "links='[{\"href\": \"#home\", \"label\": \"Home\"}, {\"href\": \"#about\", \"label\": \"About\"}]'",
					"default": "[]"
				},
				brand: {
					"description": "Brand name displayed in the navbar & offcanvas.",
					"type": "string",
					"example": "brand=\"My company name\"",
					"default": "My company name"
				},
				position: {
					"description": "Position of the navbar.",
					"type": "string",
					"alternatives": [
						"sticky-top",
						"position-static",
						"position-relative",
						"position-absolute",
						"position-fixed",
						"position-sticky",
						"fixed-top",
						"fixed-bottom",
					],
					"example": "position=\"static\"",
					"default": "sticky-top"
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

document.addEventListener('DOMContentLoaded', () => { customElements.define("bs-navbar", BsNavbar) })