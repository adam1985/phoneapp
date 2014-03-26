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
    };

    return {
        subToArray : subToArray
    };

});
