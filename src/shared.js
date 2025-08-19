export function validateControl(el) {
	if (!el) return false;

	if (el.checkValidity()) {
		el.classList.remove('is-invalid');
		el.classList.add('is-valid');
		el.removeAttribute('aria-invalid');
		return true;
	} else {
		el.classList.remove('is-valid');
		el.classList.add('is-invalid');
		el.setAttribute('aria-invalid', 'true');
		return false;
	}
};