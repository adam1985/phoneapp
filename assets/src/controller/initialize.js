define(['jquery', 'jquery.mobile',  'component/touchslider', 'component/touchScroll',
    './initializeScroll', 'component/superMarquee'],
    function($, mobile, TouchSlider, TouchScroll, initializeScroll){

        var touchSlider, touchScroll;

        $(function(){
            // 品牌露出无缝滚动
            $('.layout-banner').superMarquee({
                isEqual: true,
                distance: 25,
                time: 10,
                direction: 'up'
            });
        });

        $(document).on('pageshow', function() {

            // 设置焦点图播放
            touchSlider = new TouchSlider('focus-picture-box',{
                auto: true,
                speed: 300,
                timeout: 5000,
                before: function(index){
                    $('#focus-picture-buttons').find('a').removeClass('on').eq( index ).addClass('on');
                    $('#focus-picture-titles').find('a').removeClass('on').eq( index ).addClass('on');
                }
            });


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