define( ['jquery',  'component/iscroll', './usableMaxHeight',  'component/tools'],
    function($, iScroll, usableMaxHeight, tools){

    var iscroll;

    return function() {
        var setTouchScroll = function() {

            // 设置内容可视最大高度
            usableMaxHeight( $ );

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
                    wheelAction: 'zoom'
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