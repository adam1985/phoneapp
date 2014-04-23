define(['jquery',   'component/fastclick', 'component/tools'], function($, FastClick, tools){
        return function() {
            FastClick.attach(document.body);

            if( tools.isIos ) {
                $('.layout-header').find('h1').css({
                    margin : 'auto',
                    'text-align': 'center'
                })
            }
        };
});