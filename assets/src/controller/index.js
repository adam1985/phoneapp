require.config({
    baseUrl: 'assets/src',
    paths: {
        'jquery': 'jquery/jquery',
        'jquery.mobile' : 'mobile/jquery.mobile',
        'jquery.touchslider' : 'component/jquery.touchslider',
        'touchslider' : 'component/touchslider'
    },
    shim: {
       // 'touchslider': ['jquery', 'jquery.mobile']
    }
});

require(['controller/init']);