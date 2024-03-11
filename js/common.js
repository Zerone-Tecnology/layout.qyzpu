$(function() {

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

	$('.mmenu').on('click', function(){
		$('#mmenu').toggleClass('active');
	})

	// megamenu
	// // $('#mmenu').each(function(){
	// // 	$(this).on('click', function(e){
	// // 		$(this).find('.uk-navbar-dropdown-nav').triggerHadler('z-open');
	// // 		e.prevendDefault();
	// // 	});
	// // });
	// $('#mmenu li').on('click', function(e){
	// 	e.preventDefault();
	// 	// $(this).not($(this).parent().find('.uk-navbar-dropdown-nav')).parent().addClass('z-open');
  //   // $(this).parent().find('.uk-navbar-dropdown-nav').toggleClass('z-open');
	// 	// $(this).not($(this).parent().find('z-open')).children('div').children('ul').addClass('z-open');
	// 	$(this).parent().find('.uk-navbar-dropdown-nav').removeClass('z-open');
	// 	$(this).children('div').children('ul').addClass('z-open');
	// });

});
