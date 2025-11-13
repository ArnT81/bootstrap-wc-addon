function showError(el, formGroup) {
	el.classList.add('is-invalid');
	el.classList.remove('is-valid');
	formGroup?.classList.add('is-invalid');
	formGroup?.classList.remove('is-valid');
	return true;
};

function removeError(el, formGroup) {
	el.classList.remove('is-invalid');
	el.classList.add('is-valid');
	formGroup?.classList.remove('is-invalid');
	formGroup?.classList.add('is-valid');
	return false;
}

export function validateControl(el) {
	if (!el) return false;
	const formGroup = el.closest('.mb-3, fieldset, .form-check');
	const isValid = el.checkValidity();

	if (!isValid) return showError(el, formGroup);
	else removeError(el, formGroup);
};