$(document).ready(function() {
	$("#login").click(function() {
		var account = $("#account").val().trim();
		var password = $("#password").val().trim();
		if (account == "") {
			Ext.example.msg('对不起', "账号不能为空！");
			return false;
		}
		if (password == "") {
			Ext.example.msg('对不起', "密码不能为空！");
			return false;
		}
		$.post("/InformationSystemService/user/login", {
					account : account,
					password : password
				}, function(data, status) {
					if (status) {
						if (data.success) {
							setCookie("ghtn_user", JSON.stringify(data.user), 7);
							window.location.href = "index.html";
						} else {
							Ext.example.msg('对不起', "账号或密码错误！");
						}
					}
				});
		return false;
	});
});