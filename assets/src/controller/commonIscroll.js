define(['jquery', './initializeScroll'], function($, initializeScroll){
    return function() {
            var iscroll = initializeScroll({
                zoom: false,
                wheelAction : null
            });

        $(window).on('load', function(){
            iscroll.refresh();
        });

    };
});