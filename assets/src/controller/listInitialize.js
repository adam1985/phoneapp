define(['jquery', 'component/template', './pullDownUpLoad', 'conf/config'],
    function($, template, pullDownUpLoad, config){

        return function( complete ){

            var hash = location.hash.substr(1);

            $.ajax({
                url: config.base + 'data/list/' + hash + '/list-conf.js',
                dataType: 'jsonp',
                jsonpCallback : 'listConfCallBack',
                beforeSend : function() {
                    $.mobile.loading('show');
                },
                success : function( data) {

                    if( data ) {
                        document.title = data.title;
                        var pageIndex = data.latestPage;

                        var dtd = $.ajax({
                            url: config.base + 'data/list/' + hash + '/' + data.newsSource + data.latestPage +  '.js',
                            dataType: 'jsonp',
                            jsonpCallback : 'newsListsCallBack',
                            success: function( data ){
                                $.mobile.loading('hide');
                                var newsListsContainer = $('#news-lists-container');
                                if( data ) {
                                    var templateStr = template.render('news-lists-template', {
                                        list : data
                                    });
                                    newsListsContainer.html( templateStr );
                                } else {
                                    newsListsContainer.hide();
                                }

                            }
                        });

                        $.when( dtd ).done( function(){
                            complete && complete();

                            pullDownUpLoad(function(myScroll){
                                $.ajax({
                                    url: config.base + 'data/list/' + hash + '/' + data.newsSource + data.latestPage +  '.js',
                                    dataType: 'jsonp',
                                    jsonpCallback : 'newsListsCallBack',
                                    success: function( res ){
                                        if( res ) {
                                            pageIndex = data.latestPage;

                                            var newsListsContainer = $('#news-lists-container');
                                            var templateStr = template.render('news-lists-template', {
                                                list : res
                                            });
                                            newsListsContainer.html( templateStr );
                                        }

                                        myScroll.refresh();
                                    }
                                });
                            }, function(myScroll){
                                --pageIndex;
                                if( pageIndex > 0 ) {
                                    $.ajax({
                                        url: config.base + 'data/list/' + hash + '/' + data.newsSource + pageIndex + '.js',
                                        dataType: 'jsonp',
                                        jsonpCallback : 'newsListsCallBack',
                                        success: function( data ){
                                            var newsListsContainer = $('#news-lists-container');
                                            if( data.length >>> 0) {
                                                var templateStr = template.render('news-lists-template', {
                                                    list : data
                                                });
                                                newsListsContainer.append( templateStr );
                                            }

                                            myScroll.refresh();
                                        }
                                    });
                                    return pageIndex > 1;
                                }
                                return false;
                            });

                        });
                    }

                }
            });

        };
});