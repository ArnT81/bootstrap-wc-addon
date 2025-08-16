function copyCode(btn) {
	const code = btn.previousElementSibling?.innerText;
	if (!code) return;
	console.log(code);

	navigator.clipboard.writeText(code).then(() => {
		// manipulates the button inside the web component
		const internalBtn = btn.querySelector('button');
		internalBtn.innerText = 'Copied!';
		setTimeout(() => internalBtn.innerText = 'Copy', 1500);
	});
}


document.addEventListener("DOMContentLoaded", () => {

	document.querySelectorAll('.copy-btn').forEach(btn => {
		btn.addEventListener('click', () => copyCode(btn));
	});
})