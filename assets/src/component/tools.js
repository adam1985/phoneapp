define(['jquery'], function($){

    /**
     * 获取数组中后几条数据
     * @param data 待处理数据
     * @param size 几条数据
     * @param isReverse 是否反转数组
     * @returns {array}
     */
    var subToArray = function ( data, size, isReverse ) {
        if( $.isArray( data ) ) {
            if( isReverse ) {
                data.reverse();
            }
            return $.grep(data, function( n, i ){
                return i < size;
            });
        }
        return [];
    },

    joinAssignSrc = function( data ){

        (function(data){
            var arg = arguments;
            if($.isArray( data )){
                $.each( data, function() {
                    var self = this;
                    if( self.aid ) {
                        self.src += '?aid=' + self.aid;
                    } else if( self.player ) {
                        var params = {
                            assigntype : 'video',
                            title : self.title
                        };

                        self.src += ( self.src.indexOf('?') == -1 ? '?' : '&' ) + $.param( params );
                    }
                    if( self.list && $.isArray( self.list ) ) {
                        arg.callee( self.list );
                    }
                });
            }

        }(data));

        return data;
    },

    // 判断浏览器是否为webkit
    isWebkit = (function() {
        var UA = navigator.userAgent.toLowerCase(), _isWebkit = false;
        if (/webkit/i.test(UA)) {
            _isWebkit = true;
        }
        return _isWebkit;
    }());

    return {
        subToArray : subToArray,
        isWebkit : isWebkit,
        joinAssignSrc: joinAssignSrc
    };

});
