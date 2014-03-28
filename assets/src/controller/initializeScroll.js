define( ['jquery',  'component/iscroll', './usableMaxHeight'], function($, iScroll, usableMaxHeight){

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
                    scrollbarClass: 'myScrollbar',
                    useTransition: false,
                    hideScrollbar: true,
                    onScrollStart : function(){
                        console.log(1111);
                    }
                });
            }

            setTimeout(function () { layoutContent.style.left = '0'; }, 800);

            document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

            return iscroll;
        };

        $(window).on('orientationchange, resize', setTouchScroll);

        return setTouchScroll();
    };

});