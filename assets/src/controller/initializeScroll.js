define( function(){
    return function($, TouchScroll){
        var layoutHeader = $('.layout-header:visible'),
            layoutContent = $('.layout-content:visible'),
            layoutFooter = $('.layout-footer:visible'),
            contentHeight = document.documentElement.clientHeight - layoutHeader.height() - layoutFooter.height();
        layoutContent.height( contentHeight );

        return new TouchScroll({
            id: layoutContent[0],
            width: 5,
            mouseWheel: true,
            keyPress: true,
            opacity: 0.5,
            color: '#333',
            minLength: 20
        });

    };
});