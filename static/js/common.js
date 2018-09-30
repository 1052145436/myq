/**
 * Created by Administrator on 2016/10/2.
 */
var commonObj = {
    init:function(){
        require(['./jquery'],function($){
            initLogic();
            function initLogic(){
                $('#return-top').click(function(){
                    $('body,html').stop().animate({scrollTop:0},500);
                });
            }
        });
    },
    appKey: '5683a82e80e91d5a67953b324005edf5a7',
    appId: '1601290001'
}

exports.commonObj = commonObj;