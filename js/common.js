$(function() {

	document.addEventListener("mousemove", parallax);
	function parallax(e){
		this.querySelectorAll('.img-g').forEach(layer => {
			const speed = layer.getAttribute('data-speed')

			const x = (window.innerWidth - e.pageX*speed)/100
			const y = (window.innerHeight - e.pageY*speed)/100

			layer.style.transform = `translateX(${x}px) translateY(${y}px)`
		})
	}

	new WOW().init();

	$('.slider').owlCarousel({
		items: 1,
		nav: true
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	$('#menuToggle').click(function(){
		$('#mmenu').toggleClass('active');
	})

});
