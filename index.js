


document.addEventListener('DOMContentLoaded', () => {




	const blupp = new Navbar

	console.log(blupp.documentation());




	liveToastBtn = document.getElementById('liveToastBtn');

	liveToastBtn.addEventListener('click', () => {
		const myToast = document.querySelector('bs-toast');

		myToast.setToastContent({
			title: 'titel',
			text: 'text',
			variant: 'warning'
		});

		myToast.showToast();
	});
})