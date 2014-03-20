define(['jquery', 'jquery.mobile',  'touchslider'], function($, mobile, TouchSlider){

        var touchSlider;

        $(function(){
            touchSlider = new TouchSlider('focus-picture-box',{
                auto: true,
                speed: 300,
                timeout: 3000,
                before: function(index){
                    $('#focus-picture-buttons').find('a').removeClass('on').eq( index ).addClass('on');
                    $('#focus-picture-titles').find('a').removeClass('on').eq( index ).addClass('on');
                }
            });
        });

        $(document).on( "pageinit", function( event ) {
            if( touchSlider ) {
                touchSlider.play();
            }
        } );

        $(document).on('pageshow', function(){

            var layoutHeader = $('.layout-header:visible'),
                layoutContent = $('.layout-content:visible'),
                layoutFooter = $('.layout-footer:visible'),
                contentHeight = document.documentElement.clientHeight - layoutHeader.height() - layoutFooter.height();
            layoutContent.height( contentHeight );
    });

});