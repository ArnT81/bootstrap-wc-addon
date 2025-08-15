// src/index.d.ts

// ===============================
//  Gemensamma typer
// ===============================
export interface NavbarLink {
	href?: string;
	label?: string;
	target?: string;
	[key: string]: any;
}
export type NavbarLinks = NavbarLink[];






// ===============================
//  BsNavbar
// ===============================
export interface BsNavbarAttributes {
	links?: string;
	brand?: string;
	"focus-color"?: string;
	position?: string;
}

export class BsNavbar extends HTMLElement {
	connectedCallback(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  BsButton
// ===============================
export interface BsButtonAttributes {
	variant?: string;
	size?: string;
	disabled?: boolean | string;
}

export class BsButton extends HTMLElement {
	connectedCallback(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  BsSpinner
// ===============================
export interface BsSpinnerAttributes {
	variant?: string;
	size?: string;
}

export class BsSpinner extends HTMLElement {
	connectedCallback(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  BsToast
// ===============================
export interface BsToastAttributes {
	message?: string;
	variant?: string;
	delay?: string | number;
}

export class BsToast extends HTMLElement {
	connectedCallback(): void;
	show(): void;
	hide(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  BsSelect
// ===============================
export interface Option {
	value?: string;
	label?: string;
	selected?: boolean;
}
export type Options = Option[];

export interface BsSelectAttributes {
	options?: string;
	label?: string;
}

export class BsSelect extends HTMLElement {
	connectedCallback(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  BsHero
// ===============================
export interface BsHeroAttributes {
	title?: string;
	subtitle?: string;
	background?: string;
	"text-color"?: string;
	class?: string;
}

export class BsHero extends HTMLElement {
	connectedCallback(): void;
	documentation(): Record<string, any>;
}

// ===============================
//  Paketexporter
// ===============================
export {
	BsNavbar,
	BsButton,
	BsSpinner,
	BsToast,
	BsSelect,
	BsHero
};

// ===============================
//  HTML-taggar för TSX
// ===============================
declare global {
	interface HTMLElementTagNameMap {
		"bs-navbar": BsNavbar;
		"bs-button": BsButton;
		"bs-spinner": BsSpinner;
		"bs-toast": BsToast;
		"bs-select": BsSelect;
		"bs-hero": BsHero;
	}
}
