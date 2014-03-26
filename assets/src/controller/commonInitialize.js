define(['jquery',  'component/touchScroll', './initializeScroll'],
    function($, TouchScroll, initializeScroll){

        var touchScroll;

        return (function(){

            //设置滚动条
            var setTouchScroll = function() {
                if( touchScroll ) {
                    touchScroll.destroy();
                }
                touchScroll = initializeScroll($, TouchScroll);
            };

            setTouchScroll();

            $(window).on('orientationchange, resize', setTouchScroll);

        });

});