/**
 * Created by Administrator on 2017/1/4.
 */
$(document).ready(function () {
	//用户别名
    $("#usersubname").blur(function(){
    	var subname=$(this).val();
    	if(subname==""){
    		alert("别名不能为空");
    		$("#usersubname").focus();
    		return false;
    	}
    	$.ajax({ url: "/YNU_XYPT/people/checkUsersubname.do",
    		data:{userSubname:subname},
    		dataType:"json",
    		type:"post",
    		success: function(data){
    			if(!data)
    	    	{   //可以注册
    	    		$("#usersubname").parent().removeClass("has-error");
    	    		$("#subnamespan").removeClass("glyphicon-remove");
    	    		$("#subnamelabelERROR").addClass("sr-only");
    	    		
    	    		$("#usersubname").parent().addClass("has-success");
    	    		$("#subnamespan").addClass("glyphicon-ok");
    	        	$("#subnamelabelOK").removeClass("sr-only");
    	        	
    	    	}else{//不可以注册
    	    		$("#usersubname").parent().removeClass("has-success");
    	    		$("#subnamespan").removeClass("glyphicon-ok");
    	        	$("#subnamelabelOK").addClass("sr-only");
    	        	
    	        	$("#usersubname").parent().addClass("has-error");
    	    		$("#subnamespan").addClass("glyphicon-remove");
    	        	$("#subnamelabelERROR").removeClass("sr-only");
    	        	$("#usersubname").focus();
    	    		return false;
    	    	}
 
          }});
    });
    //用户名
    $("#username").blur(function(){
    	var name=$(this).val();
    	if(name==""){
    		//不能注册
    		$("#username").parent().removeClass("has-success");
    		$("#namespan").removeClass("glyphicon-ok");
        	$("#namelabelOK").addClass("sr-only");
        	
        	$("#username").parent().addClass("has-error");
    		$("#namespan").addClass("glyphicon-remove");
        	$("#namelabelERROR").removeClass("sr-only");
        	$("#username").focus();
    		return false;
    	}else{//能注册
    		$("#username").parent().removeClass("has-error");
    		$("#namespan").removeClass("glyphicon-remove");
    		$("#namelabelERROR").addClass("sr-only");
    		
    		$("#username").parent().addClass("has-success");
    		$("#namespan").addClass("glyphicon-ok");
        	$("#namelabelOK").removeClass("sr-only");
    		
    	}
    	
    });
    //密码
    $("#password1").blur(function(){
    	var password=$(this).val();
    	if(password==""||password.length<6){
    		//密码不能为空,或是至少为6位数
    		$("#password1").parent().removeClass("has-success");
    		$("#password1span").removeClass("glyphicon-ok");
        	$("#password1labelOK").addClass("sr-only");
        	
        	$("#password1").parent().addClass("has-error");
    		$("#password1span").addClass("glyphicon-remove");
        	$("#password1labelERROR").removeClass("sr-only");
        	$("#password1").focus();
    		return false;
    	}else{
    		$("#password1").parent().removeClass("has-error");
    		$("#password1span").removeClass("glyphicon-remove");
    		$("#password1labelERROR").addClass("sr-only");
    		
    		$("#password1").parent().addClass("has-success");
    		$("#password1span").addClass("glyphicon-ok");
        	$("#password1labelOK").removeClass("sr-only");
    	}
    });
    //确认密码
    $("#password2").blur(function(){
    	var password2=$(this).val();
    	var password1=$("#password1").val();
    	if(password2==password1){
    		//两次密码相同
    		$("#password2").parent().removeClass("has-error");
    		$("#password2span").removeClass("glyphicon-remove");
    		$("#password2labelERROR").addClass("sr-only");
    		
    		$("#password2").parent().addClass("has-success");
    		$("#password2span").addClass("glyphicon-ok");
        	$("#password2labelOK").removeClass("sr-only");
    	}else{
    		$("#password2").parent().removeClass("has-success");
    		$("#password2span").removeClass("glyphicon-ok");
        	$("#password2labelOK").addClass("sr-only");
        	
        	$("#password2").parent().addClass("has-error");
    		$("#password2span").addClass("glyphicon-remove");
        	$("#password2labelERROR").removeClass("sr-only");
        	$("#password2").focus();
    		return false;
    	}
    });
    //construct毕业时间
    var starttime=1950;
    var endtime=2050;
    for(i=starttime;i<endtime;i++)
    {
    	var str=$("#selectbytime").html();
    	str+="<option value="+i+">"+i+"</option>";
    	$("#selectbytime").html(str);
    }
   //major
    $("#major").blur(function(){
    	var value=$(this).val();
    	if(value==""){
    		alert("专业名称不能为空");
    		$(this).focus();
    	}
    });
    //地址
	var longitude;
 	var latitude;
    $("#address").blur(function(){
    	var myGeo = new BMap.Geocoder();

 		var point = new BMap.Point(116.331398,39.897445);
 		myGeo.getPoint($(this).val(), function(point){
 			latitude=point.lat;
 			longitude=point.lng;
 		});
    });
    //factory
    $("#factory").blur(function(){
    	var factory=$(this).val();
    	if(factory=="")
    	{
    		$("#factory").parent().removeClass("has-success");
    		$("#factoryspan").removeClass("glyphicon-ok");
        	$("#factorylabelOK").addClass("sr-only");
        	
        	$("#factory").parent().addClass("has-error");
    		$("#factoryspan").addClass("glyphicon-remove");
        	$("#factorylabelERROR").removeClass("sr-only");
        	$("#factory").focus();
    	}else{
    		$("#factory").parent().removeClass("has-error");
    		$("#factoryspan").removeClass("glyphicon-remove");
    		$("#factorylabelERROR").addClass("sr-only");
    		
    		$("#factory").parent().addClass("has-success");
    		$("#factoryspan").addClass("glyphicon-ok");
        	$("#factorylabelOK").removeClass("sr-only");
    	}
    });
    //post
    $("#post").blur(function(){
    	var post=$(this).val();
    	if(post==""){
    		$("#post").parent().removeClass("has-success");
    		$("#postspan").removeClass("glyphicon-ok");
        	$("#postlabelOK").addClass("sr-only");
        	
        	$("#post").parent().addClass("has-error");
    		$("#postspan").addClass("glyphicon-remove");
        	$("#postlabelERROR").removeClass("sr-only");
        	$("#post").focus();
    	}else{
    		$("#post").parent().removeClass("has-error");
    		$("#postspan").removeClass("glyphicon-remove");
    		$("#postlabelERROR").addClass("sr-only");
    		
    		$("#post").parent().addClass("has-success");
    		$("#postspan").addClass("glyphicon-ok");
        	$("#postlabelOK").removeClass("sr-only");
    	}
    });
    //phone
    $("#telephone").blur(function(){ 
    	var isMobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1})|(14[0-9]{1}))+\d{8})$/;  
    	var isPhone = /^(?:(?:0\d{2,3})-)?(?:\d{7,8})(-(?:\d{3,}))?$/;;  
    	var mobile = $.trim($("#telephone").val()); 
    	   //如果为1开头则验证手机号码  
    	 if((!isMobile.test(mobile)&& mobile.length != 11) && !isPhone.test(mobile)){
    		$("#telephone").parent().removeClass("has-success");
     		$("#telephonespan").removeClass("glyphicon-ok");
         	$("#telephonelabelOK").addClass("sr-only");
         	
         	$("#telephone").parent().addClass("has-error");
     		$("#telephonespan").addClass("glyphicon-remove");
         	$("#telephonelabelERROR").removeClass("sr-only");
         	$("#telephone").focus();
            return false;
         }else{
        	$("#telephone").parent().removeClass("has-error");
     		$("#telephonespan").removeClass("glyphicon-remove");
     		$("#telephonelabelERROR").addClass("sr-only");
     		
     		$("#telephone").parent().addClass("has-success");
     		$("#telephonespan").addClass("glyphicon-ok");
         	$("#telephonelabelOK").removeClass("sr-only");
         }
    });
    //
   
	
    $("#regSubmit").click(function(){
    	var subname=$("#usersubname").val();
    	var username=$("#username").val();
    	var password=$("#password1").val();
    	var sex=$('input:radio[name="sex"]:checked').val();//1:男，2:女
    	var bytime=$("#selectbytime option:selected").text();
    	var major=$("#major").val();
    	var address;
    	var province=$("#province").val();
    	var city=$("#city").val();
    	var county=$("#county").val();
    	address=province+city+county;
    	var clearAddress=$("#address").val();
    	var factory=$("#factory").val();
    	var post=$("#post").val();
    	var phoneid=$("#telephone").val();
    	//地址解析
    	
    	
    	$.ajax({ url: "/YNU_XYPT/people/addUser.do",
    		data:{name:username,
    			  subname:subname,
    			  password:password,
    			  sex:sex,
    			  bytime:bytime,
    			  major:major,
    			  factory:factory,
    			  post:post,
    			  telephone:phoneid,
    			  address:address,
    			  clearAddress:clearAddress,
    			  longitude:longitude,
    			  latitude:latitude
    		},
    		dataType:"json",
    		type:"post",
          });
    	$("#infoModal").modal('show');
    });
    $("#btnBackToLogin").click(function(){
    	location.href="/YNU_XYPT/public/login.html";
    });
    
});