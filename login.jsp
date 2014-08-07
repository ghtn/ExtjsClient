<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312">
<LINK rel=stylesheet type=text/css href="login/css/login.css">
<title>登录</title>
<script>
	if(<%=request.getParameter("result") %> == '0'){
		alert("用户名或密码错误！");
	};
</script>
</head>
<BODY topMargin=10 bgColor=#e7e7e7>
	<TABLE border=0 cellSpacing=0 cellPadding=0 width=970
		background=login/images/bg_login.jpg align=center>
		<TBODY>
			<TR>
				<TD width=30></TD>
				<TD class=head height=100 width=924></TD>
			</TR>
			<TR>
				<TD colSpan=2><FORM method="post" name="forms"
						action="../InformationSystemService/user/login">
						<TABLE border=0 cellSpacing=0 cellPadding=0 width=895 align=center>
							<TBODY>
								<TR>
									<TD bgColor=#18558c height=2 colSpan=2></TD>
								</TR>
								<TR>
									<TD height=20 colSpan=2></TD>
								</TR>

								<TR>
									<TD width=528><IMG src="login/images/login_left.jpg"
										width=528 height=325></TD>
									<TD class=login_right>
										<TABLE border=0 cellSpacing=0 cellPadding=0 width="70%"
											align=center>
											<TBODY>
												<TR>
													<TD style="COLOR: #ffffff; FONT-SIZE: 14px" class=nr
														height=25 width=79 align=middle>帐号：</TD>
													<TD width=178><INPUT style="WIDTH: 150px"
														class=wenbenkuang value="" name="name" id="Admin_name"></TD>
												</TR>
												<TR class=nr>
													<TD style="COLOR: #ffffff; FONT-SIZE: 14px" height=25
														align=middle>密码：</TD>
													<TD class=nr><INPUT style="WIDTH: 150px"
														id="passwords" class=wenbenkuang type="password" value=""
														name="password"></TD>
												</TR>
											</TBODY>
										</TABLE> <BR>
										<TABLE border=0 cellSpacing=2 cellPadding=0 width=170
											align=center>
											<TBODY>
												<TR>
													<TD height=30>
														<DIV align=center>
															<INPUT
																style="BORDER-RIGHT-WIDTH: 0px; BORDER-TOP-WIDTH: 0px; BORDER-BOTTOM-WIDTH: 0px; BORDER-LEFT-WIDTH: 0px"
																class=go-wenbenkuang value=""
																src="login/images/button_login02.gif" type=image
																onclick="return login()" >
														</DIV>
													</TD>
												</TR>
											</TBODY>
										</TABLE>
									</TD>
								</TR>

							</TBODY>
						</TABLE>
					</FORM>
					<TABLE border=0 cellSpacing=0 cellPadding=0 width=895 align=center>
						<TBODY>
							<TR>
								<TD height=18>&nbsp;</TD>
							</TR>
							<TR>
								<TD style="COLOR: #636563" height=32
									background=login/images/bg_login_boot.jpg align=middle>版权所有：太原东山煤矿有限责任公司&nbsp;&nbsp;&nbsp;&nbsp;Copyright
									@ 2014-2015&nbsp;&nbsp;&nbsp;技术支持：北京国华天能科技有限公司</TD>
							</TR>
							<TR>
								<TD style="COLOR: #636563" height=32 align=middle>&nbsp;</TD>
							</TR>
						</TBODY>
					</TABLE></TD>
			</TR>
		</TBODY>
	</TABLE>
</BODY>
<script>
	function submit(callback){
		callback();
	}
	function addCookie(){
		document.cookie = "userName=" + document.getElementById("Admin_name").value;
	}
	function login() {
		var name = document.getElementById("Admin_name").value;
		var password = document.getElementById("passwords").value;
		if ("" == name || password == "") {
			alert('请输入用户名或密码！');
			return false;
		}
		submit(addCookie);
	}
</script>
</html>