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


var nav = document.querySelector('nav');
var table = document.querySelector('#invoiceTable');

if(nav && table){
	console.log(table.clientWidth)
	nav.style.width = table.scrollWidth + 17 + 'px';
}

