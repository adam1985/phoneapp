define(['jquery', './initializeScroll'], function($, initializeScroll){
    return function() {
            var iscroll = initializeScroll({
                zoom: false,
                wheelAction : null
            });

    };
});