



class Navbar extends HTMLElement {
	connectedCallback() {
		let links = [];
		try { links = JSON.parse(this.getAttribute("links") || "[]") }
		catch (e) { console.error("Invalid JSON in links attribute", e) }

		const brand = this.getAttribute("brand") || ""
		const focusColor = this.getAttribute("focusColor") || "var(--primary-color)"


		this.innerHTML = `
			<style>
				.navbar-toggler:focus {
					box-shadow: 0 0 0 0.15rem ${focusColor} !important;
					outline: none;
				}

				.btn-close:focus {
					box-shadow: 0 0 0 0.15rem ${focusColor} !important;
					outline: none;
				}
			</style>

			<nav class="navbar fixed-top position-relative">
				<div class="container-fluid">
					<div class="navbar-brand" style="color: inherit;">${brand}</div>

					<button class="navbar-toggler" type="button" data-bs-toggle="offcanvas"
					data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
						<svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
							<path
								stroke-linecap='round'
								stroke-miterlimit='10'
								stroke-width='2'
								stroke='currentColor'
								d='M4 7h22M4 15h22M4 23h22'
							/>
						</svg>
					</button>

					<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
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
									<li><a class="dropdown-item" href="${link.href}">${link.label}</a></li>
								`).join("")}
							</ul>
						</div>
					</div>
				</div>
			</nav>
        `;
	}
}


$(() => { customElements.define("my-navbar", Navbar) })