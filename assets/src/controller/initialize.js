define(['jquery', 'jquery.mobile',  'component/touchslider', 'component/touchScroll',
    './initializeScroll', 'component/superMarquee'],
    function($, mobile, TouchSlider, TouchScroll, initializeScroll){

        var touchSlider;

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
            var touchScroll = initializeScroll($, TouchScroll);

            $(window).on('orientationchange, resize',function(){
                if( touchScroll ) {
                    touchScroll.destroy();
                }
                touchScroll = initializeScroll($, TouchScroll);
            });

            if( touchScroll )  {
                $(touchScroll.container).on('scrollstart', function(){
                    touchScroll.vbar.show();
                });

                $(touchScroll.container).on('scrollstop', function(){
                    touchScroll.vbar.show();
                });
            }


            // 品牌露出无缝滚动
            $('.layout-banner').superMarquee({
                isEqual: true,
                distance: 25,
                time: 10,
                direction: 'up'
            });
        });

});