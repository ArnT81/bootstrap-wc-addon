/*!
 * Bootstrap WC Addon v1.0.0
 * Copyright (c) 2025 Anders Söderberg
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

// index.js — ESM entrypoint
import './bs-navbar.js';
import './bs-button.js';
import './bs-spinner.js';
import './bs-toast.js';
import './bs-select.js';
import './bs-hero.js';
import './bs-carousel.js';

// Ingen export krävs om komponenterna själva gör customElements.define()
// Men du *kan* exportera dem om du vill att folk ska kunna göra egna instanser:
export * from './shared.js';
export { BsNavbar } from './bs-navbar.js';
export { BsButton } from './bs-button.js';
export { BsSpinner } from './bs-spinner.js';
export { BsToast } from './bs-toast.js';
export { BsSelect } from './bs-select.js';
export { BsHero } from './bs-hero.js';
export { BsCarousel } from './bs-carousel.js';