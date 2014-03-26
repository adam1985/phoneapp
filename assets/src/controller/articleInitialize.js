define(['jquery', 'component/template'],  function($, template){

        return function( complete ){

            $.ajax({
                url: 'assets/conf/config.js',
                dataType: 'jsonp',
                jsonpCallback : 'configCallBack',
                beforeSend : function() {
                    $.mobile.loading('show');
                },
                success: function( config ){
                    var hash = location.hash.substr(1);

                    $.ajax({
                        url: config.base + 'data/article/' + hash + '.js',
                        dataType: 'jsonp',
                        jsonpCallback : 'articleCallBack',
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