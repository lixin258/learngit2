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


if ($.cookie("cartdata")) {
	$.ajax({
		url: '../json/des_info.json',
		type: 'POST'
	})
	.done(function(data) {
// 
		var data=eval(data)
		var arr=data.result;
		//cart_getcookie()//调用函数
		
		//function cart_getcookie(){
		var cartcookie={};
		cartcookie=JSON.parse($.cookie("cartdata"))
			//console.log(cartcookie)
		var arr2=[]
		var str=""
		$.each(cartcookie,function(key,value){
			
			
			//console.log(arr_list)
			for (var i = 0; i < arr.length; i++) {
				if(arr[i].pid==key){
					var obj=arr[i]
					var obj2=arr[i].edition
				}
			};
			//console.log(arr_list)
			var arr_list=value.split("@")
			for (var i = 0; i < arr_list.length-1; i++) {
				var num=arr_list[i].split("#")[0]
				arr2.push(arr_list[i].split("#")[1])
				
				var typenum=arr2[i].split("&")[0]
				var imgnum=arr2[i].split("&")[1]
					//console.log(num,typenum,imgnum)
					//console.log(num+'#'+typenum+'&'+imgnum+'@') 
					str+="<li cart_num='"+num+"' cookie_str='"+num+'#'+typenum+'&'+imgnum+'@'+"' class='clearfix'><div class='cart_check left'><i class='iconfont'>&#xe60c;</i></div><div class='cart_img left'><img src='../"+obj.imgclass[imgnum].img+"' alt=''></div><div class='cart_name left'><p>"+obj.name+"&nbsp;"+obj2[typenum].type+"</p><span>适配机型："+obj.name+"</span></div><div class='cart_price left'>"+obj2[typenum].price+"</div><div class='cart_num left'><div class='change_goods_num'><i class='iconfont'>&#xe631;</i><input type='text' value='"+num+"' disabled='disabled'><i class='iconfont'>&#xe650;</i></div></div><div class='cart_total left'>"+parseInt(obj2[typenum].price)*num+"元</div><div class='cart_action left'><p><i class='iconfont'>&#xe81a;</i></p></div></li>"
				 $(".list ul").html(str)
			};
		});	
	//}
		// 删除
		$(".list .cart_action p").click(function() {
				//cart_getcookie()
				var cookie_str=$(this).parent().parent().attr("cookie_str")
				var cart_num=$(this).parent().parent().find(".cart_num .change_goods_num input").val()
				var cartcookie={};
				cartcookie=JSON.parse($.cookie("cartdata"))
				//console.log(cartcookie)
				//var str_cookie=""
				var obj_cookie={}
				$.each(cartcookie,function(key,value){
					var str=value.replace(cookie_str,"")
					//console.log(str)
					if (str!="") {
						obj_cookie[key]=str
					};
				})
				//console.log(obj_cookie)
				
				var obj_cookie_str=JSON.stringify(obj_cookie)
				
				
				if (obj_cookie_str=="") {
					$.cookie("cartdata",obj_cookie_str,{expires:-1,path:"/"})
				}else{
					$.cookie("cartdata",obj_cookie_str,{expires:7,path:"/"})
				}
				//cart_getcookie()
				var total=$.cookie("carttotal")
				total=total-cart_num
				//console.log(total)
				$.cookie("carttotal",total,{expires:7,path:"/"})
				$(this).parent().parent().remove()
				all_total()
				has_total()
				nogoods()
			})

		// 数目的加减
		$.each($(".list .cart_num .change_goods_num input"),function(){
			var num=$(this).val()
			$(this).prev().click(function(){
				//console.log(num)
				num--
				if(num<=1){
					num=1
				}
				$(this).next().val(num)
				$(this).parent().parent().next().html(parseInt($(this).parent().parent().prev().html())*num+"元")
				moneyt()
				all_total()
				var str=$(this).parent().parent().parent().attr("cookie_str")
				var valuenum=$(this).parent().find("input").val()
				//console.log(valuenum)
				var cartcookie={};
				var obj_cookie={}
				cartcookie=JSON.parse($.cookie("cartdata"))
				$.each(cartcookie,function(key,value){

					//console.log(value)
					if (value.indexOf(str)!=-1) {
						var str2=""
						str2=valuenum+"#"+str.split("#")[1]
						
						value=value.replace(str,str2)
					}
					obj_cookie[key]=value
				})
				var obj_cookie_str=JSON.stringify(obj_cookie)
				//console.log(obj_cookie_str)
				$.cookie("cartdata",obj_cookie_str,{expires:7,path:"/"})

				has_total()
				if(valuenum!=1){
					var total=parseInt($.cookie("carttotal"))
					total=total-1
					//console.log(total)
					$.cookie("carttotal",total,{expires:7,path:"/"})
				}
				//window.location.href=""
			})
			$(this).next().click(function(){//加
				//console.log(num)
				num++
				
				$(this).prev().val(num)
				//console.log()
				$(this).parent().parent().next().html(parseInt($(this).parent().parent().prev().html())*num+"元")
				moneyt()
				all_total()
				//jiajian()
				has_total()
				var str=$(this).parent().parent().parent().attr("cookie_str")
				var valuenum=parseInt($(this).parent().find("input").val())
				//console.log(valuenum)
				var cartcookie={};
				var obj_cookie={}
				cartcookie=JSON.parse($.cookie("cartdata"))
				var str2=""
				$.each(cartcookie,function(key,value){

					//console.log(value)
					
					
					str2=valuenum+"#"+str.split("#")[1]
					value=value.replace(str,str2)
					
					obj_cookie[key]=value
					//console.log(obj_cookie[key])
				})

				var obj_cookie_str=JSON.stringify(obj_cookie)
				//console.log(obj_cookie_str)
				$.cookie("cartdata",obj_cookie_str,{expires:7,path:"/"})
				$(this).parent().parent().parent().attr({"cookie_str":str2})
				var total=parseInt($.cookie("carttotal"))
				total=total+1
				//console.log(total)
				$.cookie("carttotal",total,{expires:7,path:"/"})
				//window.location.href=""
			})
		});
		//加减引起的cookie变化的函数
		// function jiajian(){

		// }

		// 复选框的点击

		$(".list .cart_check i").click(function() {
			$(this).toggleClass("check_on")
			if($(".list .check_on").length==$(".list .cart_check").length){
				$(".list_head .cart_check i").addClass('check_on')
			}else{
				$(".list_head .cart_check i").removeClass('check_on')
			}
			moneyt()
			has_total()
		});
		$(".cart_check i").addClass('check_on')
		$(".list_head .cart_check i").click(function() {
			if($(".list .check_on").length<$(".list .cart_check").length){
				$(".list .cart_check i").addClass('check_on')
				$(this).addClass('check_on')
			}else{
				$(".cart_check i").removeClass('check_on')
			}
			moneyt()
			has_total()
		});
		moneyt()//总钱数的变化
		 function moneyt(){
			var money_total=0
			$.each($(".list .cart_check .check_on"),function() {
				money_total+=parseInt($(this).parent().parent().find(".cart_total").html())
				
			});
			$(".mytotal").html(money_total.toFixed(2))
		}
		has_total()//总数的变化
		function has_total(){
			var has_total=0
			$.each($(".list .check_on"),function(){
			var a=$(this).parent().parent().find(".cart_num .change_goods_num input").val()
			
			has_total+=parseInt(a)
			});
			$('.car_selnum').html(has_total)
		}
		all_total()
		function all_total(){
			var all_total=0
			$.each($(".list .cart_check i"),function(){
			var a=$(this).parent().parent().find(".cart_num .change_goods_num input").val()
			
				all_total+=parseInt(a)
			});
			$('.cartotal').html(all_total)
		}
		
	
		

		// if($.cookie("carttotal")){
		// 	var total=$.cookie("carttotal")
		// 	$(".cart_car .cartotal").html(total)
		// }else{
		// 	$(".cart_car .cartotal").html(0)
		// }
		nogoods()
		
	})

	function nogoods(){
		if(parseInt($.cookie("carttotal"))==0||$.cookie("carttotal")==false) {
			$(".list").css('background', 'url(../images/bg/cart-empty.png) no-repeat center center');
			$(".list_head,.cart_car").css('visibility', 'hidden');
			$(".cartbox").css('background', '#f5f5f5');
		};
	}
}
else{
	$(".list").css('background', 'url(../images/bg/cart-empty.png) no-repeat center center');
		$(".list_head,.cart_car").css('visibility', 'hidden');
		$(".cartbox").css('background', '#f5f5f5');
}















































