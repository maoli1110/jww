
 $(function() {
	window.share = {
        imgUrl : window.location.origin + '/static/img/pic_share.jpg',
		link : "http://www.yixuegames.com",
		title : "久抓抓娃娃",
		desc : "不一样的抓娃娃平台！各种限定娃娃，充值卡，礼金卡等，来就送大礼包！"
		}
		shareConfig();
	});
	
	function shareConfig(){
		$.get(window.serverPath.url+'/wxshare/app.php?fullurl='+ encodeURIComponent(location.href.split('#')[0]),
        function(data)
        {
            data = JSON.parse(data);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名，见附录1
                jsApiList: [
                    'checkJsApi',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });

    wx.error(function(res){
        // alert("error: " + res.errMsg); 
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

    });

            wx.ready(function () {
                wxcheck();
                function wxcheck(){
                    wx.checkJsApi({
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage'
                        ],
                        success: function (res) {
                            //alert(JSON.stringify(res));
                        }
                    });
                }

                wx.onMenuShareTimeline({
                    imgUrl : window.share.imgUrl,
                    link : window.share.link,
                    title : window.share.title,
                    desc : window.share.title,
                    success: function () {
                        // alert('back-success')
                        // 用户确认分享后执行的回调函数
                        $.get(window.serverPath.url+'/app/wxShareAddGolds').then(()=>{
                            // alert('back-success')
                        })

                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                });

                wx.onMenuShareAppMessage({
                    imgUrl : window.share.imgUrl,
                    link : window.share.link,
                    title : window.share.title,
                    desc : window.share.desc,
                    trigger: function (res) {
                        	// alert('用户点击分享到朋友圈');
                    },
                    success: function (res) {
                         // alert('back-success')
                        // 用户确认分享后执行的回调函数
                        $.get(window.serverPath.url+'/app/wxShareAddGolds').then(()=>{
                            // alert('back-success')
                        })
                    },
                    cancel: function (res) {
                        	// alert('已取消');
                    },
                    fail: function (res) {
                        	// alert(JSON.stringify(res));
                    }
                });

            });
        });

		}
	
		
		



