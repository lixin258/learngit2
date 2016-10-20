// 用户信息
var flag=false
if($.cookie("username")){
	var user_info=$.cookie("username")
	$(".topbar-info").html("<a href=''>欢迎用户："+user_info+"</a><span>|</span><a id='register' href='login.html'>退出登录</a>")
	$("#register").click(function(){
		$.cookie("username","",{expires:-1,path:"/"})
		$.cookie("password","",{expires:-1,path:"/"})
	})
	flag=true;
}


$(".top .logo").hover(function() {
	$(this).find("a").stop().animate({"marginLeft":"0"}, 200)
}, function() {
	$(this).find("a").stop().animate({"marginLeft":"-49px"}, 200)
});
$(window).scroll(function(event) {

	if ($(this).scrollTop()>=630) {
		$(".fixtopwrp").css('display', 'block');
	};
	if ($(this).scrollTop()<630){
		$(".fixtopwrp").css('display', 'none');
	}
});
// $('html, body').animate({scrollTop: $(".fixtopwrp").offset().top - 100 }, 400);


$.ajax({
	url: '../json/des_info.json',
	type: 'POST'	
})
.done(function(data) {
	var data=eval(data)
	var arr=data.result;
	var str=""
	var str2=""
	var str3=""
	var str4=""
	var str4=""
	var str5=""
	var str6=""
	var flag1=false;
	var flag2=false;
	var typenum=0;
	var colornum=0;
	var pid=window.location.search.replace("?","")
	for (var i = 0; i < arr.length; i++) {
		if(arr[i].pid==pid){
			var obj=arr[i]
			var obj2=arr[i].edition
			// console.log(obj2)
		}
	};
	str="<h2 class='title'>购买"+obj.name+"<span>"+obj2[0].price+"</span><a href=''>深入了解产品></a></h2>";
	for (var i = 0; i < obj.edition.length; i++) {
		str2+="<li>"+obj2[i].type+"</li>"
	};
	for (var i = 0; i < obj2[0].color_class.length; i++) {
		str3+="<li>"+obj2[0].color_class[i].color+"</li>"	
	};
	str4=obj.name+"<span>"+obj.edition[0].type+"</span>"
	str5="<div class='box'></div><img src='../"+obj.imgclass[0].img+"' alt=''>"
	str6="<a href=''><img src='../"+obj.descimg+"' alt=''></a>"
	$(".proinfo .proinfo_title").html(str)
	$(".proinfo .pro_choose_step .desc").html(obj2[0].desc)
	$(".proinfo .pro_choose_step").eq(0).find(".step_list").html(str2)
	$(".proinfo .pro_choose_step").eq(1).find(".step_list").html(str3)
	$(".msgcon").html(str4);
	$(".proinfo .pro_choose_step").eq(0).find(".step_list li:first").css('borderColor', '#ff6700')
	$(".infocon .infocon_left").html(str5)
	$(".desc_img").html(str6)
	$(".infocon .bigbox").html("<img src='../"+obj.imgclass[0].img+"' alt=''>")
	$.each($(".proinfo .pro_choose_step").eq(0).find(".step_list li"),function(index,obg){
		$(this).click(function() {
			typenum=index
			flag1=true
			flag2=false;
			$(this).siblings().css('borderColor', '#666');
			$(this).css('borderColor', '#ff6700');
			str="<h2 class='title'>购买"+obj.name+"<span>"+obj2[index].price+"</span><a href=''>深入了解产品></a></h2>";
			str3=""
			for (var i = 0; i < obj2[index].color_class.length; i++) {
				str3+="<li>"+obj2[index].color_class[i].color+"</li>"	
			};
			str4=obj.name+"<span>"+obj2[index].type+"</span>"
			$(".proinfo .proinfo_title").html(str)
			$(".proinfo .pro_choose_step .desc").html(obj2[index].desc)
			$(".proinfo .pro_choose_step").eq(1).find(".step_list").html(str3)
			$(".msgcon").html(str4);
			changeimg()
		});
	});
	changeimg()
	function changeimg(){
		$.each($(".proinfo .pro_choose_step").eq(1).find(".step_list li"),function(index,obg){
				$(this).click(function(){
					colornum=index
					flag2=true
					$(this).siblings().css('borderColor', '#666');
					$(this).css('borderColor', '#ff6700');
					str5="<div class='box'></div><img src='../"+obj.imgclass[index].img+"' alt=''>"
					$(".infocon .infocon_left").html(str5)
					
					$(".infocon .bigbox").html("<img src='../"+obj.imgclass[index].img+"' alt=''>")
				})
			})
	}
	// 放大镜
	$(".infocon_left").mouseover(function(){
		$(this).find(".box").show()
		$(".bigbox").show()
	})
	$(".infocon_left").mousemove(function(ev){
			var shotLeft=ev.pageX-$(this).offset().left-$(".box").outerWidth()/2
			var shotTop=ev.pageY-$(this).offset().top-$(".box").outerHeight()/2
			if(shotLeft<=0){
				shotLeft=0
			}
			if(shotLeft>$(this).outerWidth()-$(".box").outerWidth()){
				shotLeft=$(this).outerWidth()-$(".box").outerWidth()
			}
			if(shotTop<=0){
				shotTop = 0;
			}
			if(shotTop >= $(this).outerHeight()-$(".box").outerHeight()){
				shotTop = $(this).outerHeight()-$(".box").outerHeight();
			}
			$(".box").css({"left":shotLeft,"top":shotTop})
			var percentX = shotLeft/($(this).outerWidth()-$(".box").outerWidth());
			var percentY = shotTop/($(this).outerHeight()-$(".box").outerHeight());
			
			var imgLeft = percentX*($(".bigbox").outerWidth()-$(".bigbox img").outerWidth());
			//console.log($(".imgzoom-pop").outerWidth()-$(".imgzoom-pop img").outerWidth())
			var imgTop = percentY*($(".bigbox").outerHeight()-$(".bigbox img").outerHeight());
			//console.log(imgLeft,imgTop);
			$(".bigbox img").css({
				"left":imgLeft,
				"top":imgTop
			});


		})
	$(".infocon_left").mouseout(function(){
		$(this).find(".box").hide()
		$(".bigbox").hide()
	})
	// 放大镜结束

	// 点击加入购物车
	var arrnum=[]
	if($.cookie("cartdata")){
		var cartobj=JSON.parse($.cookie("cartdata"))
	}else{
		var cartobj={}
		// var num=0
	}
	if($.cookie("carttotal")){

		var carttotal=JSON.parse($.cookie("carttotal"))
	}else{
		var carttotal=0
	}
	var numstr=""
	var numlist=""
	$("#joincart").click(function(event) {
		if(flag2==true&&flag1==true){
			carttotal++
			var num=1
			var pid=obj.pid;
			numstr=num+"#"+typenum+"&"+colornum+"@"
			if(cartobj[obj.pid]){
				var rel="#"+typenum+"&"+colornum+"@"
				//console.log(rel)
				if(cartobj[obj.pid].indexOf(rel) != -1){
					var rel_indexOf=cartobj[obj.pid].indexOf(rel)
					var rel_indexOf_num=parseInt(cartobj[obj.pid].charAt(rel_indexOf-1))
					cartobj[obj.pid]=cartobj[obj.pid].replace(rel_indexOf_num,rel_indexOf_num+1)
					numlist=cartobj[obj.pid]
				}else{
					numlist=cartobj[obj.pid]
					numlist+=numstr
				}	
			}
			else{
					numlist+=numstr
				}
			
			cartobj[pid]=numlist;
			var cartobjstr=JSON.stringify(cartobj)
			$.cookie("cartdata",cartobjstr,{expires:7,path:"/"})
			$.cookie("carttotal",carttotal,{expires:7,path:"/"})
			var cookieObj=JSON.parse($.cookie("cartdata"))
			//console.log(cookieObj)
			//console.log(carttotal)
			$(".outbox").html("加入购物车成功")
			$(".outbox").css('display', 'block')
			$(".outbox").animate({background:"rgba(0,0,0,0.2)"},function(){
				$(".outbox").animate({background:"rgba(0,0,0,0)"})
				$(".outbox").css('display', 'none');
			});
		}
		else{
			$(".outbox").html("请添加商品属性")
			$(".outbox").css('display', 'block');
			$(".outbox").animate({background:"rgba(0,0,0,0.2)"},function(){
				$(".outbox").animate({background:"rgba(0,0,0,0)"})
					$(".outbox").css('display', 'none');
			})
		}
	});
	

})






















