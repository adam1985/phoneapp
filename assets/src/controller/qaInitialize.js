define(['jquery', './initializeScroll'], function($, initializeScroll){

    return function() {

            var iscroll = initializeScroll({
                zoom: false,
                wheelAction : null
            });

            var qaTitle = $('.qa-title');
            qaTitle.click( function(){
                var $this = $(this),
                    qaList = $this.next('.qa-list'),
                    isShow = qaList.is(':visible'),
                    toggleSlide = $this.find('a');

                if( isShow ) {
                    qaList.slideUp(function(){
                        iscroll.refresh();
                    });
                    toggleSlide[0].className = 'toggle-slide-down';
                } else {
                    qaList.slideDown( function(){
                        iscroll.refresh();
                    });
                    toggleSlide[0].className = 'toggle-slide-up';
                }
            });

            $('.qa-item').find('a').click(function(){
                $(this).next('.qa-answer').slideToggle( function(){
                    iscroll.refresh();
                });
            });
    };

});