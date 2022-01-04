var playerhigh = "1"; 
//是否开启播放器高度自适应，0关闭1开启（开启后将播放器设置100%关闭填写固定高度）

var lazyswitch = "1";
//是否开启图片懒加载，0关闭1开启（关闭后会通过js直接加载图片，速度较慢）

var playcolumn = "0"; 
//是否开启有序播放列表，0关闭，3、6、8、10、12开启并指定列数，数字代表每行列数，手机强制4列

var qrcode1 = "0";
//右侧悬浮二维码，1自动生成（当前页面二维码），填写路径将加载指定图片（建议尺寸150*150px）例：/statics/img/wxcode.png

var qrcode2 = "0";
//内容页二维码，1自动生成（当前页面二维码），填写路径将加载指定图片（建议尺寸160*160px）例：/statics/img/wxcode.png

var copyshort = "0"
//是否开启自动生成短链接，0关闭1开启（开启后点击分享按钮将会复制短链否则复制默认链接）

var baidushare = "0";
//是否开启百度分享，0关闭，启用本地分享填写/statics/api/js/share.js，启用官网分享填写http://bdimg.share.baidu.com/static/api/js/share.js（不支持https）

var stui = {
	'browser': {//浏览器
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	'mobile': {//移动端
		'popup': function() {
			$popblock = $(".popup");
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible");
				$("body").append('<div class="mask"></div>');
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible");
					$(".mask").remove();
					$("body").removeClass("modal-open")
				});
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible");
					$(this).remove();
					$("body").removeClass("modal-open")
				})
			})
		},
		'slide': function() {
			$(".type-slide").each(function(a) {
				$index = $(this).find('.active').index()*1;
				if($index > 3){
					$index = $index-3;
				}else{
					$index = 0;
				}
				$(this).flickity({
					cellAlign: 'left',
					freeScroll: true,
					contain: true,
					prevNextButtons: false,				
					pageDots: false,
					initialIndex: $index
				});
			})
		},
		'mshare': function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
				$(".mobile-share").click(function() {
					$(".mobile-share").remove();
					$("body").removeClass("modal-open")
				})
			})
		}
	},
	'images': {//图片处理
		'lazyload': function() {
			if(lazyswitch==1){
				$(".lazyload").lazyload({
					effect: "fadeIn",
					threshold: 200,
					failurelimit: 15,
					skip_invisible: false
				})
			}else{				
				$(".lazyload").each(function(){
					var original = $(this).attr("data-original");
			        $(this).css("background-image","url("+original+")");
			        $(this).attr("data-original","");
			        if($(this).attr("src")!= undefined){
			        	$(this).attr("src",original)
			        }	        
			    });
			}			
		},
		'carousel': function() {
			$('.carousel_default').flickity({
			  	cellAlign: 'left',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});					
			$('.carousel_wide').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true
			});
			$('.carousel_center').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});			
			$('.carousel_right').flickity({
			  	cellAlign: 'left',
			  	wrapAround: true,
			  	contain: true,
			  	pageDots: false
			});
		},
		'qrcode': function() {
			if(qrcode1==1){
				if($("#qrcode").length){
					var qrcode = new QRCode('qrcode', {
					  	text: stui.browser.url,
					  	width: 150,
					  	height: 150,
					  	colorDark : '#000000',
					  	colorLight : '#ffffff',
					  	correctLevel : QRCode.CorrectLevel.H
					});
					$("#qrcode img").attr("class","img-responsive")
				}
			} else {
				if($("#qrcode").length){
					$("#qrcode").append("<img class='img-responsive' src='"+qrcode1+"' width='150' height='150' />")
				}
			}
			if(qrcode2==1){
				if($("#qrcode2").length){
					var qrcode = new QRCode('qrcode2', {
					  	text: stui.browser.url,
					  	width: 160,
					  	height: 160,
					  	colorDark : '#000000',
					  	colorLight : '#ffffff',
					  	correctLevel : QRCode.CorrectLevel.H
					});
					$("#qrcode2 img").attr("class","img-responsive").css("display","inline-block");
				}
			} else {
				if($("#qrcode2").length){
					$("#qrcode2").append("<img class='img-responsive' src='"+qrcode2+"' width='160' height='160' />")
				}
			}
		}
	},
	'common': {//公共基础
		'bootstrap': function() {
			$('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
				var b = $(a.target).text();
				$(a.relatedTarget).text();
				$("span.active-tab").html(b)
			})
		},
		'Sort': function() {
			$(".sort-button").each(function(){
				$(this).on("click",function(e){
					e.preventDefault();
					$(this).parent().parent().parent().find(".sort-list").each(function(){
					    var playlist=$(this).find("li");
					    for(let i=0,j=playlist.length-1;i<j;){
					        var l=playlist.eq(i).clone(true);
					        var r=playlist.eq(j).replaceWith(l);
					        playlist.eq(i).replaceWith(r);
					        ++i;
					        --j;
					    }
					});
				});
			});
		},
		'headroom': function() {
			if($("#header-top").length){
				var header = document.querySelector("#header-top");
	            var headroom = new Headroom(header, {
					tolerance: 5,
					offset: 205,
					classes: {
						initial: "top-fixed",
						pinned: "top-fixed-up",
						unpinned: "top-fixed-down"
					}
				});
				headroom.init();
			}
		},
		'history': function() {
			if($("#stui_history").length){
				if($.cookie("recente")){
				    var json=eval("("+$.cookie("recente")+")");
				    var list="";
				    for(i=0;i<json.length;i++){
				        list = list + "<li class='top-line'><a href='"+json[i].vod_url+"' title='"+json[i].vod_name+"'><span class='pull-right text-red'>"+json[i].vod_part+"</span>"+json[i].vod_name+"</a></li>";
				    }
				    $("#stui_history").append(list);
				}
				else
		            $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片哦</p>");
			   
			    $(".historyclean").on("click",function(){
			    	$.cookie("recente",null,{expires:-1,path: '/'});
			    })
			}
		},
		'collapse': function() {
			if($(".detail").length){
				$(".detail").find("a.detail-more").on("click",function(){
					$(this).parent().find(".detail-sketch").addClass("hide");
					$(this).parent().find(".detail-content").css("display","");
					$(this).remove();
				})
			}
		},
		'scrolltop': function() {
			var a = $(window);
			$scrollTopLink = $("a.backtop");
			a.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "") : $scrollTopLink.css("display", "none")
			});
			$scrollTopLink.on("click", function() {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
				return !1
			})
		},
		'copylink': function(){
			if(copyshort==1){
				if($(".copylink").length){
					$.ajax({ 
						type : 'GET',  
				        url : 'https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long='+encodeURIComponent(stui.browser.url),
				        dataType : 'JSONP',   
				        success : function(r) {
				        	url_short = r.data.urls[0].url_short;	
				        	var clipboard = new Clipboard('.copylink', {
								text: function() {									
									return url_short;
								}
							});
							clipboard.on('success', function(e) {
								alert("地址复制成功，赶快分享给小伙伴吧！");
							});
			        	} 		        	
				    });
				}
			} else {
				if($(".copylink").length){
					var url_short = stui.browser.url;	
					var clipboard = new Clipboard('.copylink', {
						text: function() {									
							return url_short;
						}
					});
					clipboard.on('success', function(e) {
						alert("地址复制成功，赶快分享给小伙伴吧！");
					});
				}
			}
			
		},
		'share': function(){
			if(baidushare!=0){
				$(".share").html('<span class="bds_shere"></span><a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a><a class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a class="bds_bdhome" data-cmd="bdhome" title="分享到百度新首页"></a><a class="bds_tqf" data-cmd="tqf" title="分享到腾讯朋友"></a><a class="bds_youdao" data-cmd="youdao" title="分享到有道云笔记"></a><a class="bds_more" data-cmd="more" title="更多"></a>');
				window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement('script')).src=''+baidushare+'?cdnversion='+~(-new Date()/36e5)];
			}			
		}	
	}	
};

function hideplayer(){
  var system = {};  
  var p = navigator.platform;  
  var u = navigator.userAgent;  

  system.win = p.indexOf("Win") == 0;  
  system.mac = p.indexOf("Mac") == 0;  
  system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);  
  if (system.win || system.mac || system.xll) {
      if (u.indexOf('Windows Phone') > -1) {

      }else {  
         $('#ddkan_player').html('<div style=\"background-color: black;width: 100%; height: 480px;\"><center><div style=\'color:#FFFFFF\'><br><br><br><br><br><strong>「 版权原因，本视频无限期下线 」</strong><br><br>感谢大家一路的支持。<br><br>Sorry, the video can\'t be played due to copyright.</div><br><center></div>');
      }  
  }  
	
}

$(document).ready(function() {	
	if(stui.browser.useragent.mobile){	
		stui.mobile.slide();
		stui.mobile.popup();
		stui.mobile.mshare();
	}
	stui.images.lazyload();
	stui.images.carousel();
	//stui.images.qrcode();
	stui.common.bootstrap();
	stui.common.Sort();
	stui.common.headroom();
	stui.common.history();
	stui.common.collapse();
	stui.common.scrolltop();
	stui.common.copylink();
	//stui.common.share();
if(maccms.copyright=='1'){
	//判断屏蔽PC播放器
	hideplayer();
		}	

});

//player
function ddkanplay(){
document.write('<iframe class="ddkan-play-iframe" id="buffer" src="'+ddkan_player.adurl+'" width="100%" height="100%" frameborder="0" scrolling="no" style="position:absolute;z-index:9;display:none"></iframe>');
document.write('<iframe class="ddkan-play-iframe" src="'+ddkan_player.apiurl+ddkan_player.url+'" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen="true"></iframe>');
ads_show(); 
function ads_show(){
	try{
		if(ddkan_player.adurl!=null && ddkan_player.adtime>0){
			document.getElementById("buffer").style.display = "block";
			setTimeout("document.getElementById(\"buffer\").style.display=\"none\"",ddkan_player.adtime*1000);	
		}else{
			setTimeout(function(){ads_show();},200);
		}
		}catch(e){}
}
}
function tishi(){
document.writeln('<div style="margin-top:10px;"><div style="padding: 4px 0;height: 40px;clear: both;border-radius: 5px;overflow: hidden;/* background-color: #cf0617; */font-size: 16px;text-align: center;color: #fff;background: linear-gradient(to right,#ff5593 0,#ff9f16 100%);background-color: #ff9900;box-shadow: 0 5px 10px rgba(255,111,0,.25);"><a style="/* border: 1px solid #cf0617; */line-height: 30px;height: 30px;color: #fff;/* font-weight: 700; *//* width: 100%; *//* display: block; */" href="/">收藏 HJB.TV 精彩福利看不停。</a></div></div>');
}
//屏蔽PC
//if(location.toString().indexOf("163.com") <= -1)
//{ 
//var system = { win: false, mac: false, xll: false }; var p = navigator.platform; system.win = p.indexOf("Win") == 0; system.mac = p.indexOf("Mac") == 0; system.x11 = (p =="X11") || (p.indexOf("Linux") == 0); if (system.win || system.mac || system.xll) {window.location.href ="/403.php";} else {}
//}
//手机底部漂浮 
function ads_cpv(){
if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {  
//document.write('<script src="https://www.govyunfu.cn:12443/ty/EE18C0BC-E65B-4277-33-7720B196D474.alpha"><\/script>');
}
}
//百度统计
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b73775d4e2870110f01f2cf8e9302e4c";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

//360自动收录
(function(){
var src = "https://s.ssl.qhres2.com/ssl/ab77b6ea7f3fbf79.js";
document.write('<script src="' + src + '" id="sozz"><\/script>');
})();