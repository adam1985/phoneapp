define( ['jquery',  'component/iscroll',  'component/tools'],
    function($, iScroll, tools){

    var iscroll;

    return function() {
        var setTouchScroll = function() {

            var layoutContent = $('.layout-content')[0];

            if( iscroll ) {
                iscroll.refresh();
            } else {
                iscroll = new iScroll(layoutContent, {
                    scrollbarClass: tools.isWebkit ?  'myScrollbar' : false,
                    useTransition: false,
                    hideScrollbar: true,
                    zoom: true,
                    scrollX: true,
                    scrollY: true,
                    mouseWheel: true,
                    wheelAction: 'zoom',
                    onBeforeScrollMove : function(){
                        $('.layout-content').trigger('scroll');
                    }
                });
            }

            setTimeout(function () { layoutContent.style.left = '0'; }, 800);

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            return iscroll;
        };

        $(window).on('orientationchange, resize, window', setTouchScroll);

        return setTouchScroll();
    };

});