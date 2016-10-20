$(document).ready(function() {
			var flag1=false;
			var flag2=false;
			if($.cookie("register_data")){
				var obj=JSON.parse($.cookie("register_data"))
			}else{
				var obj={}
			}
			

			$(".form_box").on("submit",function(){
					isPhoneName($("#username"));
					isPassword($("#password"));
				var UserName = $("#username").val();
				var PassWord = $("#password").val();
				if(flag1==true&&flag2==true){
					
					obj[UserName]=PassWord
					var objstr=JSON.stringify(obj)
					//var str="";
					//str=$("#username").val()+"#"+$("#password").val()
					$.cookie("register_data",objstr,{expires:7,path:"/"})
					window.location.href="login.html"
				}
				
				

				return false;
			})
		
			function isPhoneName(obj){
				var re=/^1[34578]\d{9}$/;
				if($.cookie("register_data")){
					if(re.test(obj.val())){
						var register_data=JSON.parse($.cookie("register_data"))
						$.each(register_data,function(key,value){
							if(obj.val()==key){
								obj.val("此号码已注册")
								obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
								flag1=false;
							}
							else{
								obj.parent().addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
								flag1=true;
							}
						})
					}
					else{
						obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
						flag1=false;
					}
					
				 }else{
				 	if(re.test(obj.val())){
						obj.parent().addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
						flag1=true;
					}
					else{
						obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
						flag1=false;
					}
				}
				return false;
			}
			$("#username").on("focus",function(){
				
				$(this).parent().removeClass("has-error has-feedback");
				
				$(this).nextAll().remove();
				if($(this).val()=="此号码已注册"){
					$(this).val("")
				}
			 
			 })
			$("#username").on("blur",function(){
				isPhoneName($("#username"))
			})
			function isPassword(obj){
				var re=/^[a-z0-9_-]{6,18}$/;
				if(re.test(obj.val())){
					obj.parent().addClass('has-success has-feedback').append('<span class="glyphicon glyphicon-ok form-control-feedback"></span>')
					flag2=true;
				 }else{
					obj.parent().addClass("has-error has-feedback").append('<span class="glyphicon glyphicon-remove form-control-feedback"></span>')
					flag1=false;
				}
				
			}
			$("#password").on("focus",function(){
				
				$(this).parent().removeClass("has-error has-feedback");
				$(this).nextAll().remove();
			 
			 })
			$("#password").on("blur",function(){
				isPassword($("#password"))
			})
			
});