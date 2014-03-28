define(['jquery', 'component/template', './initializeScroll', 'component/jquery.lazyload', 'conf/config'],
    function($, template, initializeScroll, lazyload, config){
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

                    var iscroll = initializeScroll();

                    $('img.lazy').lazyload({
                        container: $('#scroller'),
                        effect      : 'fadeIn',
                        event: "scrollstop",
                        load : function(){
                            iscroll.refresh();
                        }
                    });

                }
            });

            // 返回上一页
            $('.layout-goback-icon').click(function(){
                history.go(-1);
            });

        };

});