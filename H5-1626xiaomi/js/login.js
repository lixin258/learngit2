$(document).ready(function() {			
	var ochecked=$.cookie().check;
	
	if(ochecked=="checked"){
		$("#checkbox").prop("checked",true)
		$("#username").val($.cookie().username)
		
	}
});
$("#checkbox").click(function(){
	$.cookie("check","checked",{expires:7})
})
$(".form_box").submit(function(){
	
	
	isPhoneName($("#username"));
	isPassword($("#password"))
	
	// $("#username").on("focus",function(){
	// 	$(this).parent().removeClass("has-error has-feedback");
	// 	$(this).nextAll().remove();
	// })
	// $("#password").on("focus",function(){
	// 	$(this).parent().removeClass("has-error has-feedback");
	// 	$(this).nextAll().remove();
	// })
	if($.cookie("register_data")){
		var cookieObj=JSON.parse($.cookie("register_data"))
		//console.log(cookieObj)
		$.each(cookieObj,function(key,value){

			if($("#username").val()==key&&$("#password").val()==value){
				$.cookie("username",$("#username").val(),{expires:7,path:"/"})
				$.cookie("password",$("#password").val(),{expires:7,path:"/"})
				window.location.href="../index.html?&"+$("#username").val();
				return false;
			}
			// else{
			// 	//window.location.href="login.html"
			// }
		})
		setTimeout(function(){
			$("#username").parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
			$("#password").parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')

		},900)
		
		var Checked=$("#checkbox").prop("checked")
		return false;
	}else{
		alert("请先注册吧！")
		return false;
	}
	
	
})
$("#username").on("focus",function(){
	//console.log(1)
	$(this).parent().removeClass("has-error has-feedback");
	$(this).nextAll().remove();
})
$("#username").on("blur",function(){
	isPhoneName($("#username"))
})


$("#password").on("focus",function(){
	
	$(this).parent().removeClass("has-error has-feedback");
	$(this).nextAll().remove();
 
 })
$("#password").on("blur",function(){
	isPassword($("#password"))
})





	
function isPhoneName(obj){
	var re=/^1[34578]\d{9}$/;
	if(re.test(obj.val())){
		obj.parent().addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
		flag1=true;
	 }else{
		obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
	}
	return false;
}
function isPassword(obj){
	var re=/^[a-z0-9_-]{6,18}$/;
	if(re.test(obj.val())){
		obj.parent().addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
		flag2=true;
	 }else{
		obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
	}
}