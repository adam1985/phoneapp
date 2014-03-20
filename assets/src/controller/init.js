define(['jquery', 'jquery.mobile',  'touchslider'], function($, mobile, TouchSlider){

    //$(function(){

        $(document).on('pageshow', function(){



            new TouchSlider('focus-picture-box',{
                auto: true,
                speed: 300,
                timeout: 3000,
                before: function(index){
                    $('#focus-picture-buttons').find('a').removeClass('on').eq( index ).addClass('on');
                    $('#focus-picture-titles').find('a').removeClass('on').eq( index ).addClass('on');
                }
            });

            var layoutHeader = $('.layout-header:visible'),
                layoutContent = $('.layout-content:visible'),
                layoutFooter = $('.layout-footer:visible'),
                contentHeight = document.documentElement.clientHeight - layoutHeader.height() - layoutFooter.height();
            layoutContent.height( contentHeight );

        //});


    });

});