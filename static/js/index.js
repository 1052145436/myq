/**
 * Created by Administrator on 2016/10/1.
 */
var indexObj = {
    init: function () {
        require(['./jquery', './newsID', './proxy', './common', './alert','./lazysizes.min'], function ($, newsIDJS, proxyJS, commonJS, alertJS) {
            initLogic();
            function initLogic() {

                commonJS.commonObj.init();
                alertJS.alertObj.init();

                initS2();
                function initS2() {

                    var songsList = [__uri('../static/song/music1.mp3'), __uri('../static/song/music2.mp3'), __uri('../static/song/music3.mp3')];

                    $('.sound-down').click(function () {
                        var myAudio = document.getElementById('m-audio');

                        if (myAudio == undefined || myAudio == null) {
                            return;
                        } else {
                            if (myAudio.paused == false) {
                                myAudio.pause();

                                $('#music-list>li').each(function () {
                                    var $soundDown = $(this).find('.sound-down');
                                    $soundDown.hide();
                                })
                            }
                        }
                    });

                    $('.s2-sound').click(function () {
                        var myAudio = document.getElementById('m-audio');
                        if (myAudio == undefined || myAudio == null) {

                        } else {
                            if (myAudio.paused == false) {
                                myAudio.pause();
                            }
                        }

                        var dataId = parseInt($(this).attr('data-id'));
                        var audioStr = '<audio id="m-audio">'
                            + '<source src="' + songsList[dataId - 1] + '" type="audio/mpeg">'
                            + '</audio>';
                        $('#song-box').html(audioStr);
                        myAudio = document.getElementById('m-audio');

                        function musiceEndFun(){
                            $('#music-list>li').each(function () {
                                var $soundDown = $(this).find('.sound-down');

                                if ($soundDown.is(':visible') == true) {
                                    $soundDown.hide();
                                }
                            });
                            myAudio.removeEventListener('ended',musiceEndFun);
                            $('#song-box').html('');
                        }
                        myAudio.addEventListener('ended',musiceEndFun,false)
                        myAudio.play();

                        var $parent = $(this).parent();
                        var parentIndex = $parent.index();

                        $('#music-list>li').each(function () {
                            var itemIndex = $(this).index();
                            var $soundDown = $(this).find('.sound-down');

                            if (itemIndex == parentIndex) {
                                if ($soundDown.is(':visible') == false) {
                                    $soundDown.show();
                                }
                            } else {
                                if ($soundDown.is(':visible') == true) {
                                    $soundDown.hide();
                                }
                            }

                        });

                    });
                }

                initS3();
                function initS3() {


                    var _latestList = null;
                    var REQ_NEWS_MAX_NUM = 50;

                    var _navIndex = 0;

                    $('#news-nav>span').click(function () {
                        var $ele = $(this);
                        if ($ele.hasClass('current') == false) {
                            _navIndex = $ele.index();

                            $ele.addClass('current').siblings().removeClass('current');

                            $('#news-list').html('');
                            updateNewsList();
                        }
                    });


                    reqNewsByNewsIdAjax(newsIDJS.newsIDObj.GXLM_PC_ID);

                    //req news by news id
                    function reqNewsByNewsIdAjax(id) {
                        proxyJS.proxyObj.reqCommonNewsByATypeAjax({
                            aType: id,
                            limit: REQ_NEWS_MAX_NUM,
                            req: 'multi_simple',
                            success: reqNewsSuccRes,
                            error: reqNewsErrorRes
                        });
                    };


                    function updateNewsList() {
                        updateNewsByNewsList.apply(this, [_latestList]);
                    }


                    function updateNewsByNewsList(newsList) {
                        $('#news-list').html('');

                        var _totalPage = Math.ceil(newsList.length / 6);
                        var _currentPage = 1;
                        var m = 0;
                        var navStr = '';
                        while (m < _totalPage) {
                            if (m == 0) {
                                navStr += "<span class='current'></span>";
                            } else {
                                navStr += "<span></span>";
                            }
                            m++;
                        }
                        $('#s3-nav').html(navStr);


                        var obj = null;
                        var newsDate = null;
                        var listStr = "<div class='item'>";
                        var year = 0;
                        var month = 0;
                        var date = 0;
                        var path = "";
                        var typeStr = newsIDJS.newsIDObj.GXLM_NAV_LATEST;

                        for (var i = 0; i < newsList.length; i++) {
                            obj = newsList[i];
                            newsDate = new Date(parseInt(obj.publish_time) * 1000);
                            year = newsDate.getFullYear();
                            month = newsDate.getMonth() + 1;
                            date = newsDate.getDate();
                            month = month < 10 ? "0" + month : month;
                            date = date < 10 ? "0" + date : date;

                            if (obj.hasOwnProperty('attr')==true && obj.attr.hasOwnProperty('link') == true && obj.attr.link==true) {
                                path = obj.content;
                            } else {
                                path = '../../m/news/' + year + '/' + month + '/' + date + '/' + obj.id + ".html";
                            }

                            if (i != 0 && i % 6 === 0) {
                                listStr += "</div><div class='item'>";
                            }

                            listStr += "<a href='" + path + "'><em>【" + typeStr + "】" + obj.title + "</em><span>" + month + "/" + date + "</span></a>";
                        }

                        listStr += "</div>";
                        $('#news-list').html(listStr);


                        var newsSwiper = new Swiper({
                            container: '.swiper',
                            item: '.item',
                            direction: 'horizontal',
                            threshold: 50,
                            duration: 300
                        });


                        newsSwiper.on('swiped', function (prev, current) {
                            $('#s3-nav>span').each(function () {
                                var $ele = $(this);
                                var itemIndex = $ele.index();
                                if (itemIndex == current) {
                                    if ($ele.hasClass('current') == false) {
                                        $ele.addClass('current');
                                    }
                                } else {
                                    if ($ele.hasClass('current') == true) {
                                        $ele.removeClass('current');
                                    }
                                }
                            })
                        });

                        $('#s3-nav>span').click(function () {
                            var $ele = $(this);
                            if ($ele.hasClass('current') == false) {
                                var itemIndex = $ele.index();
                                $ele.addClass('current').siblings().removeClass('current');
                                newsSwiper.go(itemIndex);
                            }
                        });

                        $(window).on("orientationchange",function(){
                            $('#v-video').html('');
                            window.location.reload();
                            $('#v-video').html('');
                        });
                    }

                    function reqNewsSuccRes(res) {
                        var newsList = res[0].articles[0];
                        _latestList = newsList;
                        updateNewsList();
                    }

                    function reqNewsErrorRes(res) {
                        alert(res.msg);
                    }
                }

                initLazyLoad.apply(this);
                function initLazyLoad() {
                    if (!(/msie [6|7|8]/i.test(navigator.userAgent)) == false) {
                        $('img').each(function () {
                            $(this).attr('src', $(this).attr('data-src'));
                        });
                    }
                }
            }
        });
    }
}

exports.indexObj = indexObj;