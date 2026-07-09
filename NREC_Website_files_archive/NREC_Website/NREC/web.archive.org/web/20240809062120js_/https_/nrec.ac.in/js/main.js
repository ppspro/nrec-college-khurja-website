var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");
/** ==========================================================================================

  Project :   Uniaro - Responsive Multi-purpose HTML5 Template
  Author :    Themetechmount

========================================================================================== */


/** ===============

01. Preloader
02. header_search
03. Datetimepicker
04. Fixed-header
05. Menu
06. Number rotator
07. Skillbar
08. Tab
09. Accordion
10. Isotope
11. Prettyphoto
12. Slick_slider
13. Back to top 

 =============== */


(function($) {

   'use strict'


/*------------------------------------------------------------------------------*/
/* Preloader
/*------------------------------------------------------------------------------*/
   // makes sure the whole site is loaded
    $(window).on("load",function() {
            // will first fade out the loading animation
         $("#preloader").fadeOut();
            // will fade out the whole DIV that covers the website.
         $("#status").fadeOut(9000);
    })


/*------------------------------------------------------------------------------*/
/* header_search
/*------------------------------------------------------------------------------*/
    
    $(".header_search").each(function(){  
        $(".search_btn", this).on("click", function(e){

            e.preventDefault();
            e.stopPropagation();

            $(".header_search_content").toggleClass("on");

                if ($('.header_search a').hasClass('open')) {

                    $( ".header_search a i" ).removeClass('ti-close').addClass('ti-search');
                    
                    $(this).removeClass('open').addClass('sclose');    

                } 

                else {
                    $(".header_search a").removeClass('sclose').addClass('open');

                    $( ".header_search a i" ).removeClass('ti-search').addClass('ti-close');  
                    
                    }
                });

    });

    
/*------------------------------------------------------------------------------*/
/* Datetimepicker
/*------------------------------------------------------------------------------*/

/* side-menu */
    $(".fbar-main").each(function(){  
        $(".fbar-btn > a", this).on("click", function(e){
            e.preventDefault();
            $(".fbar-main-inner").toggleClass("on");
            $("i", this).toggleClass("ti-menu ti-close");
        });
    });

   

/*------------------------------------------------------------------------------*/
/* Fixed-header
/*------------------------------------------------------------------------------*/

    $(window).scroll(function(){
        if ( matchMedia( 'only screen and (min-width: 1200px)' ).matches ) 
        {
            if ($(window).scrollTop() >= 50 ) {

                $('.ttm-stickable-header').addClass('fixed-header');
            }
            else {

                $('.ttm-stickable-header').removeClass('fixed-header');
            }
        }
    });



/*------------------------------------------------------------------------------*/
/* Menu
/*------------------------------------------------------------------------------*/

    var menu = {
        initialize: function() {
            this.Menuhover();
        },

        Menuhover : function(){
            var getNav = $("nav.main-menu"),
                getWindow = $(window).width(),
                getHeight = $(window).height(),
                getIn = getNav.find("ul.menu").data("in"),
                getOut = getNav.find("ul.menu").data("out");
            
            if ( matchMedia( 'only screen and (max-width: 1200px)' ).matches ) {
                                                     
                // Enable click event
                $("nav.main-menu ul.menu").each(function(){
                    
                    // Dropdown Fade Toggle
                    $("a.mega-menu-link", this).on('click', function (e) {
                        e.preventDefault();
                        var t = $(this);
                        t.toggleClass('active').next('ul').toggleClass('active');
                    });   

                    // Megamenu style
                    $(".megamenu-fw", this).each(function(){
                        $(".col-menu", this).each(function(){
                            $(".title", this).off("click");
                            $(".title", this).on("click", function(){
                                $(this).closest(".col-menu").find(".content").stop().toggleClass('active');
                                $(this).closest(".col-menu").toggleClass("active");
                                return false;
                                e.preventDefault();
                                
                            });

                        });
                    });  
                    
                }); 
            }
        },
    };

    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });
    
    
    // Initialize
    $(document).ready(function(){
        menu.initialize();

    });

 

/*------------------------------------------------------------------------------*/
/* Animation on scroll: Number rotator
/*------------------------------------------------------------------------------*/
    
    $("[data-appear-animation]").each(function() {
    var self      = $(this);
    var animation = self.data("appear-animation");
    var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
        
        if( $(window).width() > 959 ) {
            self.html('0');
            self.waypoint(function(direction) {
                if( !self.hasClass('completed') ){
                    var from     = self.data('from');
                    var to       = self.data('to');
                    var interval = self.data('interval');
                    self.numinate({
                        format: '%counter%',
                        from: from,
                        to: to,
                        runningInterval: 2000,
                        stepUnit: interval,
                        onComplete: function(elem) {
                            self.addClass('completed');
                        }
                    });
                }
            }, { offset:'85%' });
        } else {
            if( animation == 'animateWidth' ) {
                self.css('width', self.data("width"));
            }
        }
    });
    

      jQuery(".ttm-circle-box").each(function () {

        var circle_box = jQuery(this);
        var fill_val = circle_box.data("fill");
        var emptyFill_val = circle_box.data("emptyfill");
        var thickness_val = circle_box.data("thickness");
        var linecap_val = circle_box.data("linecap")
        var fill_gradient = circle_box.data("gradient");
        var startangle_val = (-Math.PI / 4) * 1.5;
        if (fill_gradient != "") {
            fill_gradient = fill_gradient.split("|");
            fill_val = { gradient: [fill_gradient[0], fill_gradient[1]] };
        }
        if (typeof jQuery.fn.circleProgress == "function") {
            var digit = circle_box.data("digit");
            var before = circle_box.data("before");
            var after = circle_box.data("after");
            var digit = Number(digit);
            var short_digit = digit / 100;
            var size_val = circle_box.data("size");
            jQuery(".ttm-circle", circle_box)
                .circleProgress({ value: 0, duration: 8000, size: size_val, startAngle: startangle_val, 
                    thickness: thickness_val, linecap:linecap_val, emptyFill: emptyFill_val, fill: fill_val })
                .on("circle-animation-progress", function (event, progress, stepValue) {
                    
                    circle_box.find(".ttm-fid-number").html(before + Math.round(stepValue * 100) + after);
                });
        }
        circle_box.waypoint(
            function (direction) {

                if (!circle_box.hasClass("completed")) {
                    if (typeof jQuery.fn.circleProgress == "function") {
                        jQuery(".ttm-circle", circle_box).circleProgress({ value: short_digit });
                    }
                    circle_box.addClass("completed");
                }
            },
            { offset: "90%" }
        );
    });



   
/*------------------------------------------------------------------------------*/
/* Skillbar
/*------------------------------------------------------------------------------*/
    
    $('.ttm-progress-bar').each(function() {
        $(this).find('.progress-bar').width(0);
    });

    $('.ttm-progress-bar').each(function() {

        $(this).find('.progress-bar').animate({
            width: $(this).attr('data-percent')
        }, 2000);
    });


    // Part of the code responsible for loading percentages:

    $('.progress-bar-percent[data-percentage]').each(function () {

        var progress = $(this);
        var percentage = Math.ceil($(this).attr('data-percentage'));

            $({countNum: 0}).animate({countNum: percentage}, {
                duration: 2000,
                easing:'linear',
                step: function() {
                // What todo on every count
                    var pct = '';
                    if(percentage == 0){
                        pct = Math.floor(this.countNum) + '%';
                    }else{
                        pct = Math.floor(this.countNum+1) + '%';
                    }
                    progress.text(pct);
                }
            });
    });


/*------------------------------------------------------------------------------*/
/* Tab
/*------------------------------------------------------------------------------*/ 

    $('.ttm-tabs').each(function() {
    $(this).children('.content-tab').children().hide();
    $(this).children('.content-tab').children().first().show();
    $(this).find('.tabs').children('li').on('click', function(e) {  
        var liActive = $(this).index(),
            contentActive = $(this).siblings().removeClass('active').parents('.ttm-tabs').children('.content-tab').children().eq(liActive);
        contentActive.addClass('active').fadeIn('slow');
        contentActive.siblings().removeClass('active');
        $(this).addClass('active').parents('.ttm-tabs').children('.content-tab').children().eq(liActive).siblings().hide();
        e.preventDefault();
    });
});



/*------------------------------------------------------------------------------*/
/* Accordion
/*------------------------------------------------------------------------------*/

/*https://www.antimath.info/jquery/quick-and-simple-jquery-accordion/*/
$(".accordion").each(function(){

    var allPanels = $('.toggle').children(".toggle-content").hide();
    $('.toggle').children(".toggle-content").eq(2).slideDown("easeOutExpo");
    $('.toggle').children(".toggle-title").children("a").eq(2).addClass("active");

    $('.toggle').children(".toggle-title").children("a").on('click',function(){        
        var current = $(this).parent().next(".toggle-content");
        $(".toggle-title > a").removeClass("active");
        $(this).addClass("active");
        allPanels.not(current).slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");                
        return false;                
    });

});


/*------------------------------------------------------------------------------*/
/* Isotope
/*------------------------------------------------------------------------------*/

   $(function () {

        if ( $().isotope ) {           
            var $container = $('.isotope-project');
            $container.imagesLoaded(function(){
                $container.isotope({
                    itemSelector: '.ttm-box-col-wrapper',
                    transitionDuration: '1s',
                    layoutMode: 'fitRows'
                });
            });

            $('.portfolio-filter li').on('click',function() {                           
                var selector = $(this).find("a").attr('data-filter');
                $('.portfolio-filter li').removeClass('active');
                $(this).addClass('active');
                $container.isotope({ filter: selector });
                return false;
            });
        };

   });


    
/*------------------------------------------------------------------------------*/
/* Prettyphoto
/*------------------------------------------------------------------------------*/
$(function () {

     // Normal link
    jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function(){
        if( jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('prettyphoto') && !jQuery(this).hasClass('modula-lightbox') ){
            var attr = $(this).attr('data-gal');
            if (typeof attr !== typeof undefined && attr !== false && attr!='prettyPhoto' ) {
                jQuery(this).attr('data-rel','prettyPhoto');
            }
        }
    });     

    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery('a.ttm_prettyphoto').prettyPhoto();
    jQuery('a[data-gal^="prettyPhoto"]').prettyPhoto();
    jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'})

});
    


/*------------------------------------------------------------------------------*/
/* Slick_slider
/*------------------------------------------------------------------------------*/
    $(".slick_slider").slick({
        speed: 1000,
        infinite: true,
        arrows: false,
        dots: false,                   
        autoplay: false,
        centerMode : false,

        responsive: [{

            breakpoint: 1360,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {

            breakpoint: 1024,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {

            breakpoint: 680,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 575,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });


/*------------------------------------------------------------------------------*/
/* Back to top
/*------------------------------------------------------------------------------*/

// ===== Scroll to Top ==== 
jQuery('#totop').hide();

jQuery(window).scroll(function() {
    "use strict";
    if (jQuery(this).scrollTop() >= 1000) {        // If page is scrolled more than 50px
        jQuery('#totop').fadeIn(200);    // Fade in the arrow
        jQuery('#totop').addClass('top-visible');
    } else {
        jQuery('#totop').fadeOut(200);   // Else fade out the arrow
        jQuery('#totop').removeClass('top-visible');
    }
});

jQuery('#totop').on('click',function() {      // When arrow is clicked
    jQuery('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
    return false;
});



$(function() {

    });

})(jQuery);
}

/*
     FILE ARCHIVED ON 06:21:20 Aug 09, 2024 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:23:02 Jul 08, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.933
  load_resource: 219.466
  PetaboxLoader3.resolve: 57.687
  PetaboxLoader3.datanode: 113.157 (2)
  loaddict: 112.346
*/