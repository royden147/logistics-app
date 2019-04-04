const alertClose = document.querySelector('.close');

if(alertClose){
	alertClose.addEventListener('click', (e) => {
		alertClose.parentElement.remove()
		console.dir(alertClose.parentElement)
	});

	// setTimeout(()=>{
	// 	alertClose.parentElement.remove()
	// }, 6000)
}
