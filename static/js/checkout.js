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
                controlCashPayFun:function(){

                },
                initUI:function(){
                    // 所购买的商品列表
                    var isShowGoodsList = false;
                    $('#checkout-pro-list').click(function(){
                        isShowGoodsList = !isShowGoodsList;
                        if(isShowGoodsList == true){
                            $('#checkout-proList-ul').stop().slideDown();
                            $('#checkout-show-plBtn>span').html('收缩');
                            $('#checkout-show-plBtn>i').addClass('rotateIcon');
                        }else{
                            $('#checkout-proList-ul').stop().slideUp();
                            $('#checkout-show-plBtn>span').html('展开');
                            $('#checkout-show-plBtn>i').removeClass('rotateIcon');
                        }
                    });


                    // 支付这一块的逻辑
                    var cashPayList = $('#checkout-cashpay-list>li');
                    var cashPayIndex = 0;
                    function controlCashPayFun(){
                        cashPayList.each(function(index,element){
                            if(index == cashPayIndex){
                                $(this).find('.fa-circle-o').hide();
                                $(this).find('.fa-check-circle').show();
                            }else{
                                $(this).find('.fa-circle-o').show();
                                $(this).find('.fa-check-circle').hide();
                            }
                        });
                    }

                    controlCashPayFun();

                    if(cashPayList.length>1){
                        cashPayList.click(function(){
                            let eleIndex = $(this).index();
                            if(eleIndex != cashPayIndex){
                                cashPayIndex = eleIndex;
                                controlCashPayFun();
                            }
                        });
                    }

                    // 添加更多商品
                    $('#checkout-coupon-tip').click(function(){
                        $('#checkout-more-goods').show();
                        $('body').css({
                            'overflow-y':'hidden'
                        });
                    });
                    $('.checkout-more-goods-closeBtn').click(function(){
                        $('#checkout-more-goods').hide();
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
