define(['jquery', 'jquery.mobile', './commonInitialize',  './indexInitialize',  './listInitialize',
    './articleInitialize', './qaInitialize',  './commonIscroll'],
    function($, mobile, commonInitialize, indexInitialize, listInitialize,
             articleInitialize, qaInitialize, commonIscroll){

        $.extend( $.mobile, {
            ajaxEnabled: false
        });

        $(function(){

            // 初始化公共模板
            commonInitialize();

            //初始化首页模块
            if( $('#index-page').length ) {
                indexInitialize();
            }

            //初始化文章详情页模块
            if( $('#list-page').length ) {
                listInitialize();
            }

            // 初始化文章详情页模块
            if( $('#article-page').length ) {
                articleInitialize();
            }

            // 活动规则
            if( $('#qa-page').length ) {
                qaInitialize();
            }

            // 渲染滚动条
            if( $('.common-page').length ) {
                commonIscroll();
            }

        });

});