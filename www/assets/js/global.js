$(function(){

	// Cache selectors
	var lastId,
		topMenu = $(".nav-main, .menu-responsive"),
		topMenuHeight = topMenu.outerHeight()-3,
		menuItems = topMenu.find("a"),
		scrollItems = menuItems.map(function(){
			var elem=''+$(this).attr("href");
			if(elem.charAt(0)=='#') {
				var item = $($(this).attr("href"));
				if (item.length) { return item; }
			}
		});

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function(e){
		var href = $(this).attr("href"),
		offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
		$('html, body').stop().animate({ 
			scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;
		// Get id of current scroll item
		var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop)
			return this;
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";
	
		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems.removeClass("nav-main__link--active");
			$("[href=#"+id+"]").addClass("nav-main__link--active");
		}	
    });

	$(window).scroll(function(){
		$('.banner').toggleClass('is-scrolled', $(this).scrollTop() > 1);
    });

	// Flexslider
    $('.flexslider').flexslider({
    	slideshow: true,
    	slideshowSpeed: 6000,  
    	animation: "fade",
    	directionNav: false,
    });

    // Responsive menu
    $('.nav-toggle').click(function(){
        $('.nav-main__items').slideToggle();
        return false;
    });


    $('.nav-main__item').click(function(){
    	if($(window).width() < 980){
        	$('.nav-main__items').slideUp();
    	}else{
    		$('.nav-main__items').show();
    	}
    });

    $(window).resize(function(){
		if($(window).width() >= 980){
			$('.nav-main__items').show();
		}
    });

});
