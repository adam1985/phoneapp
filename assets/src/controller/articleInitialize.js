define(['jquery', 'component/template', './initializeScroll', 'component/jquery.lazyload', 'component/jquery.uri', 'conf/config'],
    function($, template, initializeScroll, lazyload, uri, config){
        return function( complete ){

            var aid = $.uri( location.href ).at('query').aid;

            $.ajax({
                url: config.base + 'data/article/' + aid + '.js',
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

                    var iscroll = initializeScroll({
                        onScrollStart : function(){
                            iscroll.refresh();
                        }
                    });

                    layoutArticle.find('img').lazyload({
                        container: $('.layout-content'),
                        //effect      : 'fadeIn',
                        //event: "scroll",
                        "threshold": 200,
                        load : function(){
                            iscroll.refresh();
                        }
                    });

                    $(document).on('touchstart', function(){
                        iscroll.refresh();
                    });

                },
                error : function(){
                    alert('文章数据格式可能有误，请检查文章内容中换行是否加了\\换行符!');
                }
            });

            // 返回上一页
            /*$('.layout-goback-icon').click(function(e){
                e.preventDefault();
                history.go(-1);
                return false;
            });*/

        };

});