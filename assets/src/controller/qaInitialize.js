define(['jquery', './initializeScroll'], function($, initializeScroll){

    return function() {

            var iscroll = initializeScroll({
                zoom: false,
                wheelAction : null
            });

            var setOffsetTop = function( obj ) {
                var top = obj.getBoundingClientRect().top + $(obj).height(),
                    se = document.documentElement.clientHeight,
                    offsetTop = top - se ;
                if( offsetTop > 0 ) {
                    iscroll.scrollTo(0, iscroll.y - offsetTop);
                }
            };


            var qaTitle = $('.qa-title');
            qaTitle.on('tap', function(){
                var $this = $(this),
                    qaList = $this.next('.qa-list'),
                    isShow = qaList.is(':visible'),
                    toggleSlide = $this.find('a');

                qaList.slideToggle(function(){
                    iscroll.refresh();
                    setOffsetTop(this);
                });

                toggleSlide[0].className = isShow ? 'toggle-slide-down' : 'toggle-slide-up';

            });

            $('.qa-item').on('tap', 'a', function(e){
                e.stopPropagation();
                $(this).next('.qa-answer').slideToggle( function(){
                    iscroll.refresh();
                    setOffsetTop(this);
                });
            });
    };

});