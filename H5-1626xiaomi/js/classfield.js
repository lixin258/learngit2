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
		nocart()
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
		url: '../json/des_info.json',
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
					str+="<li class='clearfix'><p class='gsimg' href=''><img src='../"+obj.imgclass[imgnum].img+"' alt=''></p><p class='gstype'>"+obj2[typenum].type+"</p><p class='carpri'><span class='gspri'>"+obj2[typenum].price+"</span>*<span class='gsnum'>"+num+"</span></p></li>"
				 $(".cartmenu").html(str)
			};
		});	
	})
}


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
		}
		
		$(".site-header .header-search").mouseover(function(){
			$(this).find("input").css({"borderColor":"#999"});
			$(this).find("input:first").css({"borderRight":"none"})
		})
		$(".site-header .header-search").mouseout(function(){
			$(this).find("input").css({"borderColor":"#e0e0e0"});
			$(this).find("input:first").css({"borderRight":"none"})
		})

	});	









$.ajax({
			url: '../json/main1.json',
			type: 'POST'
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
				if(obj[i].attr=="小米手机"){
					str3+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(1).find(".contain").html(str3);

				if(obj[i].attr=="红米"){
					str4+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(2).find(".contain").html(str4)

				if(obj[i].attr=="平板 · 笔记本"){
					str5+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(3).find(".contain").html(str5)

				if(obj[i].attr=="电视"){
					str6+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(4).find(".contain").html(str6)
				if(obj[i].attr=="盒子 · 影音"){
					str7+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(5).find(".contain").html(str7)
				if(obj[i].attr=="路由器"){
					str8+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
				}
				$(".site-header .onav>li").eq(6).find(".contain").html(str8)
				if(obj[i].attr=="nav智能硬件"){
					str9+="<li><div class='oimg'><a href=''><img src='../"+obj[i].img+"' alt=''></a></div><p class='title'><a href=''>"+obj[i].name+"</a></p><p class='price'>"+obj[i].price+"</p></li>"
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

// banner上边导航结束
	$(".movegif,.banner_nav,.banner_nav div").mouseover(function(){
		$(".banner_nav").css('display', 'block');
	})	
	$(".movegif,.banner_nav").mouseout(function(){
		$(".banner_nav").css('display', 'none');
	})	
	// 搜索框
	// $(".site-header .header-search").mouseover(function(){
	// 			$(this).find("input").css({"border":"1px solid #999"});
	// 			$(this).find("input:first").css({"borderRight":"none"})
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
			$(this).parent().find("p").css({"display":"block"})
					$(".site-header .header-search").mouseover(function(){
						$(this).find("input").css({"borderColor":"#999"});
						$(this).find("input:first").css({"borderRight":"none"})
			})
			$(".site-header .header-search").mouseout(function(){
				$(this).find("input").css({"borderColor":"#e0e0e0"});
				$(this).find("input:first").css({"borderRight":"none"})
			})

		});	


// 导航
	$.each($(".banner_nav>ul>li"),function(){
			$(this).mouseover(function(){
				console.log(1)
				$(this).siblings().find("div").css({"display":"none"})
				$(this).find("div").css({"display":"block"})
			})
			$(this).mouseout(function(){
				$(this).find("div").css({"display":"none"})
			})
		})

		$(".pic_right li:first").css({"marginLeft":"0"})

	var index_name=window.location.search.replace("?","")
	index_name=decodeURIComponent(index_name);
	$(".opositionwrp .oposition .positioncon").html(index_name)
	$.ajax({
		url: '../json/classfield.json',
		type: 'POST'
	
	})
	.done(function(data) {
		var data=eval(data)
		var obj=data.result;
		//console.log(obj)
		var str=""
		var arr=[]
		var total =0
		for (var i = 0; i < obj.length; i++) {
			if(obj[i].attr==index_name){
				total++
				arr.push(obj[i])
			}	
		};
		
		
		var yeshu=Math.ceil(total/4)
		var str1=""
		var changenum=0

		for (var i = 0; i < yeshu; i++) {
			str1+="<li>"+(i+1)+"</li>"
		};
		var str2="<button class='btnleft'>&lt;</button>"+str1+"<button class='btnright'>&gt;</button>"
		$(".class_list_btn").html(str2)
		$(".class_list_btn li:first").css({"background":"#999","color":"#f00"})
		function paging(n){
			var num=total>(n+1)*4?(n+1)*4:total;
			//var cr =total>(n+1)*num?(n+1)*num:total;
			str=""
			for (var i = n*4; i < num; i++) {
				str+="<li class='list_1'><a class='picimg' href='describe.html?"+arr[i].id+"'><img src='../"+arr[i].img+"' alt=''></a><div class='class_list_con'><dl><dt>"+arr[i].name+"<span>"+arr[i].price+"</span><b>元起</b></dt><dd>"+arr[i].desc+"</dd></dl><p class='class_list_btn'><a href='describe.html?"+arr[i].id+"'>立即购买</a></p></div></li>"					
			};
			$(".classcon .class_list").html(str)
		};
		paging(changenum)
		$(".classcon .btnleft").click(function(){
			changenum--
			if(changenum<=0){
				changenum=0
			}
			
			$(this).siblings('').css({"background":"#fff","color":"#000"})
			$(".class_list_btn").find("li").eq(changenum).css({"background":"#999","color":"red"})
			paging(changenum)
		})
		$(".classcon .btnright").click(function(){
			changenum++
			if(changenum>=(yeshu-1)){
				changenum=yeshu-1
			}
			
			$(this).siblings('').css({"background":"#fff","color":"#000"})
			$(".class_list_btn").find("li").eq(changenum).css({"background":"#999","color":"red"})
			paging(changenum)
		})
		$(".class_list_btn").find("li").each(function(index, obj) {
			$(obj).on("click",function(){
				$(this).siblings('').css({"background":"#fff","color":"#000"});
				$(this).css({"background":"#999","color":"red"})
				//console.log(index)
				paging(index)
				changenum=index
			})
		});

		
	})
	
























