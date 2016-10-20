// 用户信息
var flag=false
if($.cookie("username")){
	var user_info=$.cookie("username")
	$(".topbar-info").html("<a href=''>欢迎用户："+user_info+"</a><span>|</span><a id='register' href='html/login.html'>退出登录</a><span>|</span><a href=''>消息通知</a>")
	$("#register").click(function(){
		$.cookie("username","",{expires:-1,path:"/"})
		$.cookie("password","",{expires:-1,path:"/"})
	})
	flag=true;
}




//购物车
if($.cookie("carttotal")&&flag){
	//console.log(1)
	var total=parseInt($.cookie("carttotal"))
	if(total!=0){
		$(".cartmini").css({'background':'#f00','color':'#fff'});
		$(".cartmini").hover(function() {
			$(".cartmini").css({'background':'#fff','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"block"});
			cart_getcookie()
		}, function() {
			$(".cartmini").css({'background':'#f00','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"none"});
		});
	}
	else{
		$(".cartmini").css({'background':'#ff6700','color':'#fff'});
		$(".cartmini").hover(function() {
			$(".cartmini").css({'background':'#fff','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"block"});
		

		}, function() {
			$(".cartmini").css({'background':'#ff6700','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"none"});
		});
		nocart(2)
	}
	$(".topbar-cart .cartmini .cartnum").html("("+total+")")
}else if(flag==false){
		$(".cartmini").css({'background':'#ff6700','color':'#fff'});
		$(".cartmini").hover(function() {
			$(".cartmini").css({'background':'#fff','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"block"});
			nocart(1)
		}, function() {
			$(".cartmini").css({'background':'#ff6700','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"none"});
		});
		$(".topbar-cart .cartmini .cartnum").html("("+0+")")
}
else if(flag&&!$.cookie("carttotal")){
		$(".cartmini").css({'background':'#ff6700','color':'#fff'});
		$(".cartmini").hover(function() {
			$(".cartmini").css({'background':'#fff','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"block"});
			nocart(2)
		}, function() {
			$(".cartmini").css({'background':'#ff6700','color':'#333'});
			$(".cartmini .cartmenu").css({"display":"none"});
		});
		$(".topbar-cart .cartmini .cartnum").html("("+0+")")
}
function nocart(a){
	if(a==1){
		var str="<li>亲爱滴！请先登录吧！</li>"
	}
	if(a==2){
		var str="购物车中还没有商品，赶紧选购吧！</li>"
	}
	$(".cartmini .cartmenu").css({"textAlign":"center"});
	$(".cartmini .cartmenu").html(str)
}
function cart_getcookie(){
	$.ajax({
		url: 'json/des_info.json',
		type: 'POST'
	})
	.done(function(data) {
		var data=eval(data)
		var arr=data.result;
		var cartcookie={};
		cartcookie=JSON.parse($.cookie("cartdata"))
		var arr2=[]
		var str=""
		$.each(cartcookie,function(key,value){
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].pid==key){
					var obj=arr[i]
					var obj2=arr[i].edition
				}
			};
			var arr_list=value.split("@")
			for (var i = 0; i < arr_list.length-1; i++) {
				var num=arr_list[i].split("#")[0]
				arr2.push(arr_list[i].split("#")[1])
				var typenum=arr2[i].split("&")[0]
				var imgnum=arr2[i].split("&")[1]
					str+="<li class='clearfix'><p class='gsimg' href=''><img src='"+obj.imgclass[imgnum].img+"' alt=''></p><p class='gstype'>"+obj2[typenum].type+"</p><p class='carpri'><span class='gspri'>"+obj2[typenum].price+"</span>*<span class='gsnum'>"+num+"</span></p></li>"
				 $(".cartmenu").html(str)
			};
		});	
	})
}




// banner图上边导航
$.each($(".site-header .onav>li"),function(index,obj){
	// if(index>0&&index<8){
		$(this).mouseover(function(){
			$(this).siblings().find("div").css({"display":"none"})
			$(this).find("div").css({"display":"block"})
		})
		$(this).mouseout(function(){
			$(this).find("div").css({"display":"none"})
		})
	//}			
})	

// 搜索框
// $(".site-header .header-search").mouseover(function(){
// 	$(this).parent().find("ul").css({"display":"block"})
// 	$(this).parent().find("p").css({"display":"none"})
// })
// $(".site-header .header-search").mouseout(function(){
// 	$(this).find("input").css({"border":"1px solid #e0e0e0"});
// 	$(this).find("input:first").css({"borderRight":"none"})
// })

$(".site-header .header-search>.search-text").focus(function() {
	$(this).parent().find("input").css({"borderColor":"#ff6700"});
	$(this).css({"borderRight":"none"})
	$(this).parent().find("ul").css({"display":"block"})
	$(this).parent().find("p").css({"display":"none"})
	$.each($(".header-search .result_list li"),function(){
		$(this).mouseover(function() {
			$(this).parent().parent().find(".search-text").val($(this).html())

		});
	
	})
	$(".site-header .header-search").mouseover(function(){
		$(this).find("input").css({"borderColor":"#ff6700"});
		$(this).find("input:first").css({"borderRight":"none"})
	})
	$(".site-header .header-search").mouseout(function(){
		$(this).parent().find("input").css({"borderColor":"#ff6700"});
		$(this).parent().find("input:first").css({"borderRight":"none"})
	})
	
});
$(".site-header .header-search>.search-text").blur(function() {
		$(this).parent().find("input").css({"borderColor":"#e0e0e0"});
		$(this).css({"borderRight":"none"})
		$(this).parent().find("ul").css({"display":"none"})
		if ($(this).val()=="") {
			$(this).parent().find("p").css({"display":"block"})
		};
		
		$(".site-header .header-search").mouseover(function(){
			$(this).find("input").css({"borderColor":"#999"});
			$(this).find("input:first").css({"borderRight":"none"})
		})
		$(".site-header .header-search").mouseout(function(){
			$(this).find("input").css({"borderColor":"#e0e0e0"});
			$(this).find("input:first").css({"borderRight":"none"})
		})

	});	

// banner图
	$.get("json/banner.json",function(data){
		$.each(data,function(index,value){
			
			$("<li><a href=''><img src='"+value+"' alt=''></a></li>").appendTo($("#banner .banner_list"));
			$("<a><span>").appendTo($(".slider-nav"));
		})
		var num1=0;
		var num2=4
		// var num2=0
		$(".slider-nav a").eq(4).css({"background":"#ddd"})
		$(".banner_list li").eq(0).css({"opacity": "1"})
		
		var timer=setInterval(timemove,3000)
		function timemove(){
			num1++
			num2--
			if(num1==5){
				num1=0
			}
			if(num2<0){
				num2=4;
			}
			bannermove(num1,num2)
		}	
		
		function bannermove(num1,num2){
			$(".banner_list li").eq(num1).siblings().stop().animate({"opacity": "0"})
			$(".banner_list li").eq(num1).stop().animate({"opacity": "1"})
			$(".slider-nav a").eq(num2).siblings().css({"background":"#777"})
			$(".slider-nav a").eq(num2).css({"background":"#ddd"})
		}
		// 
		$("#prev").click(function(){
			clearInterval(timer)
			num1--
			if(num1<0){
				num1=4;
			}
			num2++;
			if(num2==5){
					num2=0
				}
			bannermove(num1,num2)
			timer=setInterval(timemove,3000)
		})
		$("#next").click(function(){
			clearInterval(timer)
				num1++;
				num2--
				if(num1==5){
					num1=0
				}
				if(num2<0){
					num2=4;
				}
				bannermove(num1,num2)
				timer=setInterval(timemove,3000)
		})
		$.each($(".slider-nav a"),function(index,obj){
			
			$(this).click(function(){
				clearInterval(timer)
				num2=index;
				num1=4-index;
				bannermove(num1,num2)
				timer=setInterval(timemove,3000)
			})
			
		})
		
	})

	$.each($(".banner_nav>ul>li"),function(){
		$(this).mouseover(function(){
			$(this).siblings().find("div").css({"display":"none"})
			$(this).find("div").css({"display":"block"})
		})
		$(this).mouseout(function(){
			$(this).find("div").css({"display":"none"})
		})
	})

	$(".pic_right li:first").css({"marginLeft":"0"})

// 第一部分
	$.ajax({
		url: 'json/main1.json',
		type: 'POST',
	})
	.done(function(data) {
		var data=eval(data)
		var obj=data.result;
		//console.log(obj.length)
		var str1=""
		var str2=""
		var str3=""
		var str4=""
		var str5=""
		var str6=""
		var str7=""
		var str8=""
		var str9=""
		var str10=""
		for (var i = 0; i < obj.length; i++) {
			if(obj[i].attr=="小米明星单品"){
				str1+="<li><a class='thumb' href=''><img src='"+obj[i].img+"' alt=''></a><h3 class='title'><a href=''>"+obj[i].name+"</a></h3><p class='desc' >"+obj[i].desc+"</p><p class='price'>"+obj[i].price+"</p></li>"

			}
			$(".main1 .main1b_list").html(str1)
			if(obj[i].attr=="智能硬件"){
				str2+="<li><a class='thumb' href=''><img src='"+obj[i].img+"' alt=''></a><h3 class='title'><a href=''>"+obj[i].name+"</a></h3><p class='desc' >"+obj[i].desc+"</p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".main2 .main_list").html(str2)
			if(obj[i].attr=="小米手机"){
				str3+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(1).find(".contain").html(str3);

			if(obj[i].attr=="红米"){
				str4+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(2).find(".contain").html(str4)

			if(obj[i].attr=="平板 · 笔记本"){
				str5+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(3).find(".contain").html(str5)

			if(obj[i].attr=="电视"){
				str6+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(4).find(".contain").html(str6)
			if(obj[i].attr=="盒子 · 影音"){
				str7+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(5).find(".contain").html(str7)
			if(obj[i].attr=="路由器"){
				str8+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(6).find(".contain").html(str8)
			if(obj[i].attr=="nav智能硬件"){
				str9+="<li><div class='oimg'><a href=''><img src='"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
			}
			$(".site-header .onav>li").eq(7).find(".contain").html(str9);
			
		};
		// 共用部分
		$.each($(".main6 li,.main8 li,.main5 li,.main3r li,.main3l li,.main2 li"),function(index, el) {
				$(this).hover(function(){
					//$(this).attr("position":"relative")
					$(this).css({"position":"relative","box-shadow":"0px 4px 20px #CCC"})
					$(this).stop().animate({"zIndex":"2","top":"-2px"})
				},function(){
					$(this).stop().animate({"zIndex":"2","top":"0"})
					$(this).css({"box-shadow":"0 0 0 #CCC"})
				})
			});

	})





var m1num=0
var timer = setInterval(move,6000);
$(".main1 .main1t_top .m1next").css({"cursor":"pointer","color":"#666"})
function move(){
	m1num++
	if(m1num==1){
		$(".main1 .main1b_list").stop().animate({"margin-left":"-1240px"})
		$(".main1 .main1t_top .m1prev").css({"cursor":"pointer","color":"#666"})
		$(".main1 .main1t_top .m1next").css({"cursor":"auto","color":"#bbb"})
	}
	if(m1num==2){
		m1num=0
		$(".main1 .main1t_top .m1next").css({"cursor":"pointer","color":"#666"})
		$(".main1 .main1t_top .m1prev").css({"cursor":"auto","color":"#bbb"})
		$(".main1 .main1b_list").stop().animate({"margin-left":"0"})

	}
}
$(".main1 .main1t_top .m1prev").click(function(){
	clearInterval(timer)
	m1num=1;
	move()
	timer = setInterval(move,6000);
})
$(".main1 .main1t_top .m1next").click(function(){
	clearInterval(timer)
	m1num=0;
	move()
	timer = setInterval(move,6000);
})
//第二部分

// 第三部分右边
	$(".main3 .main3tr li").eq(0).css({
				"color": '#ff6700',
				"borderBottom": "2px solid #ff6700",
				"cursor":"pointer"
			});
	$(".main3 .main3r>ul").eq(0).css({"display":"block"});
	$.each($(".main3 .main3tr li"),function(index,obj){

		$(this).mouseover(function(){
			$(this).siblings().css({
				"color": '#333',
				"borderBottom": "0"
			});
			//console.log(index)
			$(this).css({
				"color": '#ff6700',
				"borderBottom": "2px solid #ff6700",
				"cursor":"pointer"
			});
			$(this).parent().parent().parent().find(".main3r>ul").css({"display":"none"})
			$(this).parent().parent().parent().find(".main3r>ul").eq(index).css({"display": 'block'});
		})

	})


// 第三部分右边结束
//第四部分
	$(".main4 .main3tr li").eq(0).css({
				"color": '#ff6700',
				"borderBottom": "2px solid #ff6700",
				"cursor":"pointer"
			});
	$(".main4 .main3r>ul").eq(0).css({"display":"block"});
	$.each($(".main4 .main3tr li"),function(index,obj){

		$(this).mouseover(function(){
			$(this).siblings().css({
				"color": '#333',
				"borderBottom": "0"
			});
			//console.log(index)
			$(this).css({
				"color": '#ff6700',
				"borderBottom": "2px solid #ff6700",
				"cursor":"pointer"
			});
			$(this).parent().parent().parent().find(".main3r>ul").css({"display":"none"})
			$(this).parent().parent().parent().find(".main3r>ul").eq(index).css({"display": 'block'});
		})

	})



// 第五部分

	var m5num=0
	// $(".main5 .main5t_top span").hover(function() {
	// 	$(this).css('color', '#ff6700');
	// }, function() {
	// 	$(this).css('color', '#bbb');
	// });
	$(".main5 .main5t_top .m5next").css({"cursor":"pointer","color":"#666"})
	$(".main5 .main5t_top .m5prev").click(function(){
		$(".main5 .main5t_top .m5next").css({"cursor":"pointer","color":"#666"})
		$(".main5 .main5t_top .m5prev").css({"cursor":"pointer","color":"#666"})
		m5num--
		if(m5num<=0){
			m5num=0
			$(".main5 .main5t_top .m5prev").css({"cursor":"auto","color":"#bbb"})
			$(".main5 .main5t_top .m5prev").hover
		}
		$(".main5 .main5b_list").stop().animate({"margin-left":-m5num*1240+"px"})
		
	})
	$(".main5 .main5t_top .m5next").click(function(){
		$(".main5 .main5t_top .m5prev").css({"cursor":"pointer","color":"#666"})
		$(".main5 .main5t_top .m5next").css({"cursor":"pointer","color":"#666"})
		m5num++

		if(m5num>=3){
			m5num=3;
			$(".main5 .main5t_top .m5next").css({"cursor":"auto","color":"#bbb"})
		}
		$(".main5 .main5b_list").stop().animate({"margin-left":-m5num*1240+"px"})
	})

// 第六部分
$(".main6 .main6con li:first").css('marginLeft', '0');


// 第七部分

$(".main7 .main7con:last").css('marginRight', '0');

$.each($(".main7>div"),function(index, el) {
		var m7num=0
		$(this).hover(function(){
			//$(this).attr("position":"relative")
			$(this).css({"position":"relative","box-shadow":"0px 4px 30px #CCC"})
			$(this).stop().animate({"zIndex":"2","top":"-1px"})
			$(this).find('.prev').css('display', 'block');
			$(this).find('.next').css('display', 'block');
		},function(){
			$(this).stop().animate({"zIndex":"2","top":"0"})
			$(this).css({"box-shadow":"0 0 0 #CCC"})
			$(this).find('.prev').css('display', 'none');
			$(this).find('.next').css('display', 'none');
		})
		$(this).find(".dot li span:first").css({"background":"#fff","borderColor":"#ff6700"})
		$(this).find('.next').click(function(){
			$(this).parent().find(".prev").css({'cursor':'pointer',"background":"#666"});
			$(this).css({'cursor':'pointer',"background":"#666"});
			m7num++;
			if(m7num>=3){
				m7num=3
				$(this).css({'cursor':'auto',"background":"#999"});
			}
			$(this).parent().find(".dot li span").css({"background":"#999","borderColor":"#fff"})
			$(this).parent().find(".dot li").eq(m7num).find("span").css({"background":"#fff","borderColor":"#ff6700"})
			$(this).parent().find(".m7list").animate({"marginLeft":-296*m7num+"px"})
			
		})
		$(this).find('.prev').click(function(){
			$(this).parent().find(".next").css({'cursor':'pointer',"background":"#666"});
			$(this).css({'cursor':'pointer',"background":"#666"});
			m7num--;
			if(m7num<=0){
				m7num=0;
				$(this).css({'cursor':'auto',"background":"#999"});
			}
			$(this).parent().find(".dot li span").css({"background":"#999","borderColor":"#fff"})
			$(this).parent().find(".dot li").eq(m7num).find("span").css({"background":"#fff","borderColor":"#ff6700"})
			$(this).parent().find(".m7list").animate({"marginLeft":-296*m7num+"px"})
			
		})
});
//第八部分
$(".main8 li:last").css('marginRight', '0');
$.each($(".main8 li"),function(){
	$(this).find(".movie").hover(function() {
		$(this).parent().find(".obtn").css({"background":"#ff6700","borderColor":"#ff6700","color":"#fff"})
	}, function() {
		$(this).parent().find(".obtn").css({"background":"rgba(0,0,0,0.6)","borderColor":"#fff","color":"#fff"})
	});
});












