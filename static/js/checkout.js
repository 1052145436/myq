/*
* @Author: Marte
* @Date:   2016-02-03 14:49:02
* @Last Modified by:   Marte
* @Last Modified time: 2016-08-11 16:54:54
*/
var checkoutObj = {
    init:function(){
        require(['./jquery'],function($){
            // 函数功能定义
            var commonObj = {
                initUI:function(){
                    // 添加更多商品
                    $('#coupon-tip').click(function(){
                        $('#add-more-goods').show();
                        $('body').css({
                            'overflow-y':'hidden'
                        });
                    });
                    $('#add-more-goods-closeBtn').click(function(){
                        $('#add-more-goods').hide();
                        $('body').css({
                            'overflow-y':'auto'
                        });
                    });
                }
            }
            // 执行函数
            commonObj.initUI();
        });
    }
}
exports.checkoutObj = checkoutObj;
