


document.addEventListener('DOMContentLoaded', () => {


	$("#form").on('submit', (e) => {
		e.preventDefault();
		const body = Object.fromEntries(new FormData(e.target));


		console.log(body);
	});


	/* liveToastBtn = document.getElementById('liveToastBtn');

	liveToastBtn.addEventListener('click', () => {
		const myToast = document.querySelector('bs-toast');

		myToast.setToastContent({
			title: 'titel',
			text: 'text',
			variant: 'warning'
		});

		myToast.showToast();
	}); */
})