define( ['jquery',  'component/iscroll',  'component/tools'],
    function($, iScroll, tools){

    var iscroll;

    return function( config ) {
        var setTouchScroll = function() {

            var layoutContent = $('.layout-content')[0];

            config = config || {};
            config = $.extend({
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
            }, config);

            if( iscroll ) {
                iscroll.refresh();
            } else {
                iscroll = new iScroll(layoutContent, config);
            }

            setTimeout(function () { layoutContent.style.left = '0'; }, 800);

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            return iscroll;
        };

        $(window).on('orientationchange, resize, window', setTouchScroll);

        return setTouchScroll();
    };

});