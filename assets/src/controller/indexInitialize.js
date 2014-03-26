define(['jquery', 'jquery.mobile',  'component/template', 'component/touchslider',  'component/superMarquee',   'component/tools'],
    function($, mobile, template, TouchSlider, superMarquee, tools){

        return function( complete ){

            $.ajax({
                url: 'assets/conf/config.js',
                dataType: 'jsonp',
                jsonpCallback : 'configCallBack',
                beforeSend : function() {
                    $.mobile.loading('show');
                },
                success: function( config ){
                    $.ajax({
                        url: config.base + 'data/index/index-conf.js',
                        dataType: 'jsonp',
                        jsonpCallback : 'indexConfCallBack',
                        success: function( data ){
                            if( data ) {
                                var bannerDtd = $.ajax({
                                        url: config.base + 'data/index/' + data.bannerSource,
                                        dataType: 'jsonp',
                                        jsonpCallback : 'bannerConfCallBack',
                                        success: function( data ){
                                            var layoutBanner = $('#layout-banner-box');
                                            if( data.length >>> 0) {
                                                var templateStr = template.render('banner-template', {
                                                    list : tools.subToArray(data, 5, true)
                                                });
                                                layoutBanner.html( templateStr );
                                            } else {
                                                layoutBanner.hide();
                                            }
                                        }
                                    }),

                                    focusDtd = $.ajax({
                                        url: config.base + 'data/index/' + data.focusSource,
                                        dataType: 'jsonp',
                                        jsonpCallback : 'focusConfCallBack',
                                        success: function( data ){
                                            var focusPicture = $('#focus-picture');
                                            if( data.length >>> 0) {
                                                var templateStr = template.render('focus-template', {
                                                    list : tools.subToArray(data, 6, true)
                                                });
                                                focusPicture.html( templateStr );
                                            } else {
                                                focusPicture.hide();
                                            }
                                        }
                                    }),

                                    newsDtd = $.ajax({
                                        url: config.base + 'data/index/' + data.newsSource + data.latestPage + '.js',
                                        dataType: 'jsonp',
                                        jsonpCallback : 'newsListCallBack',
                                        success: function( data ){
                                            var newsListContainer = $('#news-list-container');
                                            if( data.length >>> 0) {
                                                var templateStr = template.render('hot-news-template', {
                                                    list : data
                                                });
                                                newsListContainer.html( templateStr );
                                            } else {
                                                newsListContainer.hide();
                                            }
                                        }
                                    });



                                $.when(bannerDtd, focusDtd, newsDtd).done(function(){

                                    $.mobile.loading('hide');

                                    // 品牌露出无缝滚动
                                    $('.layout-banner').superMarquee({
                                        isEqual: true,
                                        distance: 25,
                                        time: 10,
                                        direction: 'up'
                                    });

                                    // 关闭品牌露出
                                    $('.close-banner').click(function(){
                                        $(this).closest('.layout-banner-box').slideUp('slow');
                                    });

                                    // 设置焦点图播放
                                    TouchSlider('focus-picture-box',{
                                        auto: true,
                                        speed: 300,
                                        timeout: 5000,
                                        before: function(index){
                                            $('#focus-picture-buttons').find('a').removeClass('on').eq( index ).addClass('on');
                                            $('#focus-picture-titles').find('a').removeClass('on').eq( index ).addClass('on');
                                        }
                                    });

                                    complete && complete();
                                });
                            }
                        }
                    });
                }
            });

        };

});