define( ['jquery'], function( $ ){

    return function ( fn ) {
        var mainPage = $('#main-page'),
            content = $('#layout-content', mainPage),
            linkHandler = $('a', mainPage);

        linkHandler.each(function(){
            var $this = $(this), href = $this.attr('data-href');
            if( href ) {
                $this.click(function(e){
                    e.preventDefault && e.preventDefault();
                    fn && fn();
                    var itemContents = $('.layout-item-content', content),
                        activeItemContent = itemContents.filter('.active'),
                        pageChange = content.find('.' + href);
                    activeItemContent.hide().removeClass('active');
                    pageChange.show().addClass('active');
                });
            }
        });
    };
});