$(function() {

	$.bvi({
		'bvi_target' : '.bvi-open', // Класс ссылки включения плагина
		"bvi_theme" : "white", // Цвет сайта
		"bvi_font" : "arial", // Шрифт
		"bvi_font_size" : 16, // Размер шрифта
		"bvi_letter_spacing" : "normal", // Межбуквенный интервал
		"bvi_line_height" : "normal", // Междустрочный интервал
		"bvi_images" : true, // Изображения
		"bvi_reload" : false, // Перезагрузка страницы при выключении плагина
		"bvi_fixed" : false, // Фиксирование панели для слабовидящих вверху страницы
		"bvi_tts" : true, // Синтез речи
		"bvi_flash_iframe" : true, // Встроенные элементы (видео, карты и тд.)
		"bvi_hide" : false // Скрывает панель для слабовидящих и показывает иконку панели.
	});
	
	$('#mobile-menu .m-wrap').clone().appendTo('#mmenu2');	
	$('#mmenu2').mmenu({
		navbar: {
			title: 'Главное меню'
		}
	});

	$('.btnSearch').on('click', function(){
		$('.searchContent').toggleClass('active');
	})

	$(document).click(function (e) {
		if (!$(event.target).closest(".searchContent,.btnSearch").length) {
			$("body").find(".searchContent").removeClass("active");
		}
	});
	// new WOW().init();

	var allPanels = $('.accordion-wrap > .p-content').hide();
    
  $('.accordion-wrap > .p-name').click(function() {
    allPanels.slideUp();
    $(this).next().slideDown();
    return false;
  });

	$('.programm-list li a').on('click', function(e){
		var link = e.target.hash;
		$(link).toggleClass('active');
	})
	$('.btn-pop-close').on('click', function(){
		$('.admis-popup').removeClass('active');
	})

	// $('.slider').owlCarousel({
	// 	items: 1,
	// 	nav: true
	// });

	//SVG Fallback
	// if(!Modernizr.svg) {
	// 	$("img[src*='svg']").attr("src", function() {
	// 		return $(this).attr("src").replace(".svg", ".png");
	// 	});
	// };

	$('.mmenu').on('click', function(){
		$('#mobile-menu').toggleClass('active');		
    $('body').toggleClass('fixed');
		$('#mobile-menu ul ul').removeClass('active');
		$("#mobile-menu").css("background", "#000");
	})

	$('#mobile-menu li a').on('click', function(){
		$('#mobile-menu ul ul').removeClass('active');
		$(this).parent().find('ul').toggleClass('active');
		burMenuBg = $(this).parent().data('bg-img');
		if(burMenuBg){
			$("#mobile-menu").css("background-image", "url(img/"+burMenuBg+")");
		} else {
			$("#mobile-menu").css("background", "#000");
		}
		$('#mobile-menu').animate({scrollTop: 100}, 500);
	})

});
