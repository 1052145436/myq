/**
 * Created by Administrator on 2016/10/2.
 */
var newsContentObj = {
    init:function(){
        require(['./common','./alert','./lazysizes.min'],function(commonJS,alertJS){
            initLogic();
            function initLogic(){
                alertJS.alertObj.init();
                commonJS.commonObj.init();

                initLazyLoad.apply(this);
                function initLazyLoad() {
                    if (!(/msie [6|7|8]/i.test(navigator.userAgent)) == false) {
                        $('img').each(function () {
                            $(this).attr('src', $(this).attr('data-src'));
                        });
                    }
                }
            }
        })
    }
}

exports.newsContentObj = newsContentObj;