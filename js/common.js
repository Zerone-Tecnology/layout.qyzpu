$(function() {

	new WOW().init();
	$('.programm-list li a').on('click', function(e){
		var link = e.target.hash;
		$(link).toggleClass('active');
	})
	$('.btn-pop-close').on('click', function(){
		$('.admis-popup').removeClass('active');
	})

	let tabs = document.querySelector(".tabs-wrap");
	let tabHeader = tabs.querySelector(".tab-header");
	let tabHeaderElements = tabs.querySelectorAll(".tab-header > div");
	let tabBody = tabs.querySelector(".tab-body");
	let tabBodyElements = tabs.querySelectorAll(".tab-body > div");
	let tabIndicator = tabs.querySelector(".tab-indicator > div");

	for(let i=0; i<tabHeaderElements.length; i++){
		tabHeaderElements[i].addEventListener("click", function(){
			tabHeader.querySelector(".active").classList.remove("active");
			tabHeaderElements[i].classList.add("active");
			tabBody.querySelector(".active").classList.remove("active");
			tabBodyElements[i].classList.add("active");
			tabIndicator.style.left = `${i*25}%`;
		});
	}

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
		$('#mmenu ul ul').removeClass('active');
		$("#mmenu").css("background", "#000");
	})

	$('#mmenu li a').on('click', function(){
		$('#mmenu ul ul').removeClass('active');
		$(this).parent().find('ul').addClass('active');
		burMenuBg = $(this).parent().data('bg-img');
		if(burMenuBg){
			$("#mmenu").css("background", "url(img/"+burMenuBg+")");
		} else {
			$("#mmenu").css("background", "#000");
		}
		// console.log('bg: '+burMenuBg);
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
