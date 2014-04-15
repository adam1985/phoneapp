define(['jquery'], function($){
        return function(){
                var layoutContent = $('.layout-content');

            layoutContent.on('tap', 'a', function(e){
                var $this = $(this),
                    isAppInstall = false,
                    videoState = JSON.parse( $this.attr('data-params') );
                if( videoState.isVideo ) {
                    e.preventDefault();
                    try{
                        isAppInstall = window.worldcup.isAppInstall();
                    }catch(e){
                        isAppInstall = false;
                    }

                    if( isAppInstall ) {
                        try{
                            window.worldcup.onVideoDetected( videoState.videoSrc );
                        }catch(e){
                            window.open( this.href, '_blank');
                        }
                    } else {
                        window.open( this.href, '_blank');
                    }

                }

            });

        };
});