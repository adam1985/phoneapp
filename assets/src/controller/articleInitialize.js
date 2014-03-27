define(['jquery', 'component/template', 'component/iscroll', './usableMaxHeight', 'conf/config'],
    function($, template, iScroll, usableMaxHeight, config){
        var iscroll;
        return function( complete ){

            var hash = location.hash.substr(1);

            $.ajax({
                url: config.base + 'data/article/' + hash + '.js',
                dataType: 'jsonp',
                jsonpCallback : 'articleCallBack',
                beforeSend : function() {
                    $.mobile.loading('show');
                },
                success: function( data ){
                    $.mobile.loading('hide');
                    var layoutArticle = $('#layout-article');
                    if( data ) {
                        var templateStr = template.render('article-template', data);
                        layoutArticle.html( templateStr );
                    } else {
                        layoutArticle.hide();
                    }

                    complete && complete();

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
                                hideScrollbar: true
                            });
                        }


                        setTimeout(function () { layoutContent.style.left = '0'; }, 800);

                        document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
                    };

                    setTouchScroll();

                    $(window).on('orientationchange, resize', setTouchScroll);

                }
            });

            // 返回上一页
            $('.layout-goback-icon').click(function(){
                history.go(-1);
            });

        };

});