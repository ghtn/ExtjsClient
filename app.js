/**
 * Created with IntelliJ IDEA. User: Administrator Date: 13-11-29 Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */

var user = "";
Ext.onReady(function() {
	// 开启悬浮提示功能
	Ext.QuickTips.init();

	// 开启动态加载
	Ext.Loader.setConfig({
				enabled : true
			});

	Ext.application({
				// 设定命名空间
				name : 'NewsPaper',
				// 指定配置选项，设置相应的路径
				appFolder : 'newsPaper',
				// 加载控制器
				controllers : ['MainController', 'InfoController',
						'UserController', 'GradeController',
						'ContactsController', 'MaterialController',
						'TagController', 'SubjectController',
						'MakePaperController', 'PaperController',
						'ExamController', 'ScoreController',
						'EmployeeController', 'DimissionController',
						'TransferController', 'RestoralController',
						'RetireController', 'ContractQueryController',
						'ContractRemoveController', 'ContractAddController'],
				// 自动加载和实例化Viewport文件
				// autoCreateViewport: true
				init : function() {
					user = getCookie("ghtn_user");
					if (user != "") {
						user = JSON.parse(user);
						Ext.Ajax.request({
									url : '/InformationSystemService/user/check',
									method : 'post',
									params : {
										account : user.account
									},
									success : function(response) {
										if (response.responseText == 'true') {
											Ext
													.create("NewsPaper.view.Viewport");
										} else {
											setCookie("ghtn_user", "", -1);
											user = "";
											window.location.href = "login.jsp";
										}
									},
									failure : function(response) {
										setCookie("ghtn_user", "", -1);
										user = "";
										window.location.href = "login.jsp";
									}
								});
					} else {
						setCookie("ghtn_user", "", -1);
						user = "";
						window.location.href = "login.jsp";
					}
				}
			});
});
