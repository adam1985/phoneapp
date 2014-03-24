require.config({
    baseUrl: 'assets/src',
    paths: {
        'jquery': 'jquery/jquery',
        'jquery.mobile' : 'mobile/jquery.mobile',
        'jquery.touchslider' : 'component/jquery.touchslider'
    }
});

require(['controller/initialize']);