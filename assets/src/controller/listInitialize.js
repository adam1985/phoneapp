define(['jquery', 'component/template', './initializeScroll', 'conf/config'],  function($, template, initializeScroll, config){

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
                        var templateStr = template.render('lists-title-template', {
                            title : data.title
                        });

                        $('#news-lists-title').html( templateStr );

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

                            initializeScroll(function(myScroll){
                                $.ajax({
                                    url: config.base + 'data/list/' + hash + '/' + data.newsSource + data.latestPage +  '.js',
                                    dataType: 'jsonp',
                                    jsonpCallback : 'newsListsCallBack',
                                    success: function( data ){
                                        if( data ) {
                                            var newsListsContainer = $('#news-lists-container');
                                            var templateStr = template.render('news-lists-template', {
                                                list : data
                                            });
                                            newsListsContainer.html( templateStr );
                                        }

                                        myScroll.refresh();
                                    }
                                });
                            }, function(myScroll){
                                --pageIndex;
                                if( pageIndex > 1 ) {
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
                                    return true;
                                } else {
                                    return false;
                                }

                            });
                        });
                    }

                }
            });

        };
});