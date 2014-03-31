define(['jquery',  './usableMaxHeight'], function($, usableMaxHeight){
        return function() {
            $(document).on('pageshow', function(){
                $('.layout-footer').css('position', 'inherit');
            });
        };
});