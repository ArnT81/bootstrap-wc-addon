function showError(el, formGroup) {
	el.classList.add('is-invalid');
	el.classList.remove('is-valid');
	formGroup?.classList.add('is-invalid');
	formGroup?.classList.remove('is-valid');
	return true;
};

function removeError(el, formGroup) {
	if (el.type === 'radio') {
		const radios = document.querySelectorAll(`input[type="radio"][name="${el.name}"]`);
		const anyRadioIsChecked = Array.from(radios).some(r => r.checked);

		if (anyRadioIsChecked) {
			// Ta bort error från alla radios i gruppen + formGroup
			radios.forEach(r => {
				r.classList.remove('is-invalid');
				r.classList.add('is-valid');
				r.closest('.form-check')?.classList.remove('is-invalid');
				r.closest('.form-check')?.classList.add('is-valid');
			});
			formGroup?.classList.remove('is-invalid');
			formGroup?.classList.add('is-valid');
		}
		return false;
	}

	el.classList.remove('is-invalid');
	el.classList.add('is-valid');
	formGroup?.classList.remove('is-invalid');
	formGroup?.classList.add('is-valid');
	return false;
};

export function validateControl(el) {
	if (!el) return false;
	const formGroup = el.closest('.mb-3, fieldset, .form-check');
	const isValid = el.checkValidity();

	if (!isValid) return showError(el, formGroup);
	else removeError(el, formGroup);
};