



$(document).ready(function(){

/********************************************************************
                    Photo Grid + Blog Grid JavaScript
********************************************************************/ 
       $('.grid, .section-grid').masonry({
          itemSelector: '.grid-item', 
          singleMode: false,
          columnWidth:'.grid-sizer',
          isInitLayou: false, 
          isFitWidth: true,
          isResizable: true,
          isAnimated: true,         
            animationOptions: { 
              queue: false, 
              duration: 500,
            }
        }); 

        $('.blog-grid').masonry({
          itemSelector: '.blog-item', 
          singleMode: false,
          columnWidth:'.grid-sizer',
          isInitLayou: false, 
          isFitWidth: true,
          isResizable: true,
          isAnimated: true,          
            animationOptions: { 
              queue: false, 
              duration: 500,
            }
        }); 
    
        $('.more-grid').masonry({
          itemSelector: '.blog-item2', 
          singleMode: false,
          columnWidth:'.grid-sizer',
          isInitLayou: false, 
          isFitWidth: true,
          isResizable: true,
          isAnimated: true,          
            animationOptions: { 
              queue: false, 
              duration: 500,
            }
        }); 

        $('.event-grid').masonry({
          itemSelector: '.event-item', 
          singleMode: false,
          columnWidth:'.grid-sizer',
          isInitLayou: false, 
          isFitWidth: true,
          isResizable: true,
          isAnimated: true,          
            animationOptions: { 
              queue: false, 
              duration: 500,
            }
        });

        /*** for mobile ***/
        if($(window).width() < 768){
          $('.grid, .section-grid, .blo-grid, .more-grid, .event-grid').masonry('destroy')
        }

/********************************************************************
                    Sidebar Menu functionality
********************************************************************/ 
        var trigger = $('.hamburger'),
            overlay = $('.overlay'),          
            isClosed = false;

        trigger.click(function () {
          hamburger_cross();      
        });        
        
        function hamburger_cross() {

          if (isClosed == true) {          
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');            
            isClosed = false;
          } else {   
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');           
            isClosed = true;
          }
      }
      $('[data-toggle="offcanvas"]').click(function () {
            $('#wrapper').toggleClass('toggled');
      });
      $('.nav a').click(function(){
        $('#wrapper').removeClass('toggled');
        $('.hamburger').addClass('is-closed');
        $('.hamburger').removeClass('is-open');
        isClosed = false;
      }) 



/********************************************************************
        Cover Buttons
*********************************************************************/
   /* $('.cover-camera').click(function(e){
      e.preventDefault();
      $('.cover-settings').toggleClass('cover-settings-active');
      $('.cover-camera').toggleClass('cover-camera-active');
    });*/

    $('.bg-camera').click(function(e){
      e.preventDefault();
      $('.bg-settings').toggleClass('bg-settings-active');
      $('.bg-camera').toggleClass('bg-camera-active');
    });
    
/********************************************************************
                    ArrowUp Click scroll to Top
********************************************************************
    $('.arrow-up a').click(function () {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });
/********************************************************************
                    More text description
********************************************************************/
    $('.moreText').click(function (e) {
      e.preventDefault();
      $('.userProfileDesc').toggleClass('showMoreText');
    });

/********************************************************************
                    Category Carousel settings
********************************************************************/ 
    $('.category-carousel').owlCarousel({
      center: true,     
      loop:true,
      margin: 5,
      nav:true,
      items: 10,
      responsive : {
          0 : { 
            items: 3 
          },
          560 : { 
            items: 6 
          },
          768 : { 
            items: 10 
          },
      }
      
    });

    $('.carousel-item').hover(function(){
        $(this).toggleClass('carousel-item_active');}
    ); 

  /********************************************************************
                    user loged popup
  ********************************************************************/    
     $(".user-avatar-loged").click(function(){
        $(".user-popup").toggle();
    });

  /********************************************************************
              Change avatar javascript in profile-edit.html
  ********************************************************************/

  $('.avatar-hover-effects .change-avatar').click(function(e){
    e.preventDefault();
    $('.avatar-hover-effects ul').toggleClass('active');
  });   

  /********************************************************************
                      Custom scrollbar message.html
  ********************************************************************/ 
  //$("#messages, #message-chat").niceScroll({
  //    autohidemode: false,
  //    cursorcolor: "#b0bec5",
  //    cursorwidth: "8",
  //    background: "#e2e3e4",
  //    cursorborder: false,
  //});

  /********************************************************************
                    Messages hover effect message.html
  ********************************************************************/
  $("#messages li").click(function(e){
    $(this).toggleClass("active-message");
     $("#messages li").not(this).removeClass("active-message")
    return false;    
  });

 /********************************************************************
                    Messages hover effect message.html
  ********************************************************************/
  $(".emoticons-btn").click(function(e){
    e.preventDefault();
    $(".emoticons-container").toggleClass("show");
  });


});

/********************************************************************
                   Blog block hover classes
********************************************************************/
 $(".blog-item").hover(
  function () {
    $(this).addClass("blog-item-active");    
  },
  function () {
    $(this).removeClass("blog-item-active");
  }
);

 $(".view").hover(
  function () {
    $(".zoom-control").show();    
  },
  function () {
    $(".zoom-control").hide();
  }
);

/********************************************************************
                   Events Page hover classes
********************************************************************/
 $(".event-item").hover(
  function () {
    $(this).addClass("event-item-active");    
  },
  function () {
    $(this).removeClass("event-item-active");
  }
);

/********************************************************************
                   Card Product lightbox
********************************************************************/
 $( '#my-slider' ).sliderPro({
    fade: true,
    arrows: true,
    buttons: false,
    fullScreen: true,
    autoplay: false, 
    height: 460,
    width: 460,
    thumbnailArrows: true, 
  });

 $( '#my-slider2' ).sliderPro({
    fade: true,
    arrows: true,
    buttons: false,
    fullScreen: true,
    autoplay: false, 
    height: 460,
    width: 460,
    thumbnailArrows: true, 
  });



/*****************************************************************************************
                            Scripts for mobile devices
*****************************************************************************************/

  if ($(window).width() < 767) {    
      $('.user-avatar').click(function(){
       $('.login-block').toggle();
      });
      
  }


 
