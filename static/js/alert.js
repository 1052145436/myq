/**
 * Created by Administrator on 2016/10/2.
 */
var alertObj = {
    /*check is mobile or not*/
    IsMobile: function (mobileStr) {
        var filter = /^1\d{10}$/;

        var isMobile = false;
        if (filter.test(mobileStr)) {
            isMobile = true;
        }
        return isMobile;
    },
    init: function () {
        require(['./jquery', './common', './proxy'], function ($, commonJS, proxyJS) {
            initLogic();
            function initLogic() {
                initLogin();
                function initLogin() {
                    $('#closeLoginW,#l-mask').click(function () {
                        $('#login-w').hide();
                        $('body').css({
                            'overflow-y': 'visible'
                        });
                    });

                    $('#tel-num').keyup(function () {
                        var $ele = $(this);
                        var oldStr = $ele.val();
                        $ele.val(oldStr.replace(/[^\d]/g, ''));
                    });

                    $('#tel-orderBtn').click(function () {
                        var phoneNum = $('#tel-num').val();
                        if (alertObj.IsMobile(phoneNum) == true) {
                            var deviceStr = '';
                            var ua = navigator.userAgent.toLowerCase();

                            if (/android/.test(ua) == true) {
                                deviceStr = "android"
                            } else {
                                deviceStr = 'ios';
                            }

                            var succFunc = function (res) {
                                $('#login-w').hide();
                                $('#loginRes-w').show();
                                $('body').css({
                                    'overflow-y': 'hidden'
                                });
                            };

                            var errorFunc = function (res) {
                                alert(res.msg);
                            };

                            proxyJS.proxyObj.reqCommonHdPhoneNumberOrderByAndroidOrIOSAjax({
                                action: 'getTel',
                                phone: phoneNum,
                                device: deviceStr,
                                game_name: 'xnsc',
                                version: 'gw_20161014',
                                success: succFunc,
                                error: errorFunc
                            });
                        } else {
                            alert('请输入有效的手机号码');
                        }
                    });
                }

                initLoginSuccess();
                function initLoginSuccess() {
                    $('#closeLoginResW,#lRes-mask').click(function () {
                        $('#loginRes-w').hide();
                        $('body').css({
                            'overflow-y': 'visible'
                        });
                    });
                }

                $('#s1-readyBtn,#order-btn').click(function () {
                    $('#login-w').show();
                    $('body').css({
                        'overflow-y': 'hidden'
                    })
                });


                initVideo();
                function initVideo() {
                    $('#s1-v').click(function () {
                        $('#video-w').show();

                        var videoStr = '<video src="https://resource.15166.com/video/aofei/xingniang.mp4" width="620" height="348" controls="controls" id="my-ivideo"></video>';
                        $('#v-video').html(videoStr);

                        $('body').css({
                            'overflow-y': 'hidden'
                        });

                        var _playVideoId = setTimeout(function () {
                            clearTimeout(_playVideoId);
                            var myVideo = document.getElementById('my-ivideo');
                            myVideo.play();
                        }, 200);

                    });
                    $('#v-mask,#close-vBtn').click(function () {
                        $('#v-video').html('');
                        $('#video-w').hide();
                        $('body').css({
                            'overflow-y': 'visible'
                        });
                    });
                }
            }
        });
    }
}

exports.alertObj = alertObj;