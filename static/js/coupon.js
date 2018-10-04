/*
* @Author: Marte
* @Date:   2016-02-03 14:49:02
* @Last Modified by:   Marte
* @Last Modified time: 2016-08-11 16:54:54
*/
var couponObj = {
    init:function(){
        require(['./jquery'],function($){
            // 函数功能定义
            var commonObj = {
                initUI:function(){
                    $('#flash-coupon-nav>div').click(function(){
                        $('#flash-coupon-nav>div').each(function(){
                            $(this).removeClass('current');
                        });
                        $(this).addClass('current');

                        var largeIndex = $(this).index();
                        if(largeIndex == 0){
                            $('.coupon-img-box').each(function(){
                                $(this).children('.gray_coupon_img').hide();
                                $(this).children('.canUse_coupon_img').show();
                            });
                        }else{
                            $('.coupon-img-box').each(function(){
                                $(this).children('.gray_coupon_img').show();
                                $(this).children('.canUse_coupon_img').hide();
                            });
                        }
                    })
                }
            }
            // 执行函数
            commonObj.initUI();
        });
    }
}
exports.couponObj = couponObj;
