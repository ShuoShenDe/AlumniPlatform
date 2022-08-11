$(document).ready(function(){
	  var COOKIE_SUBNAME = 'usersubname';  
	  var COOKIE_PASSWORD='userpassword';
	  
	  if($.cookie(COOKIE_SUBNAME))
	  {
		  $("#username").val($.cookie(COOKIE_SUBNAME));
	  }
	  if($.cookie(COOKIE_PASSWORD))
	  {
		  $("#userpassword").val($.cookie(COOKIE_PASSWORD));
	  }
	  $("#loginbtn").click(function(){
			var username=$("#username").val();
			var password=$("#userpassword").val();
			var inputcheckcode=($("#checknum").val()).toUpperCase();
			var checkcode=($.idcode.getCode()).toUpperCase();
			if(inputcheckcode!=checkcode)
			{
				$("#infoModal").modal('show');
			}else{
				$.ajax({ url: "/YNU_XYPT/people/checkUser.do",
		    		data:{userSubname:username,
		    			  password:password
		    		},
		    		dataType:"json",
		    		type:"post",
		    		success: function(data){
		    			if(data==0)
		    	    	{  
		    				//alert("登录失败");
		    				$("#infoModal2").modal('show');
		    	    	}else{
		    	    		if($("#checkRem").is(':checked'))
		    	    		{
		    	    			$.cookie('usersubname', username, { expires: 7 });
			    	    		$.cookie('userpassword', password, { expires: 7 });
			    	    		$.cookie('userId', data, { expires: 7 });
			    	    		
		    	    		}else{
		    	    			$.cookie('usersubname', username);
			    	    		$.cookie('userpassword', password);
			    	    		$.cookie('userId', data);
		    	    		}
		    	    		
		    	    		$("#infoModal3").modal('show');
		    	    		setTimeout(urlDirect(),500);
		    	    	}
		 
		          }});
			}
		});
	  function urlDirect()
	  {
		  location.href="/YNU_XYPT/public/index.html";
	  };
	  $("#btnBackToReg").click(function(){
		  location.href="/YNU_XYPT/public/register.html";
	  });
});