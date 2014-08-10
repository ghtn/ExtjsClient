/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */
Ext.onReady(function () {
    //开启悬浮提示功能
    Ext.QuickTips.init();

    //开启动态加载
    Ext.Loader.setConfig({
        enabled: true
    });

    Ext.application({
        //设定命名空间
        name: 'NewsPaper',
        //指定配置选项，设置相应的路径
        appFolder: 'newsPaper',
        //加载控制器
        controllers: ['MainController', 'ContactsController', 'MaterialController',
        	'TagController', 'SubjectController', 'MakePaperController',
        	'PaperController', 'ExamController', 'ScoreController', 
        	'EmployeeController', 'DimissionController', 'TransferController',
        	'RestoralController', 'RetireController'],
        //自动加载和实例化Viewport文件
//        autoCreateViewport: true
        init:function(){
        	var userName = Ext.util.Cookies.get("userName");
			if( userName != null){
				Ext.Ajax.request({
	                url: '/InformationSystemService/user/check',
	                method: 'post',
	                params: {
	                    userName:userName
	                },
	                success: function (response) {
                        if (response.responseText == 'true') {
		                	Ext.create("NewsPaper.view.Viewport");
                        } else {
                        	Ext.util.Cookies.clear("userName");
                        	window.location.href = window.location.protocol + "//" 
								+ window.location.host + "/InformationSystemClient";
                        }
	                },
	                failure: function (response) {
	                	Ext.util.Cookies.clear("userName");
						window.location.href = window.location.protocol + "//" 
							+ window.location.host + "/InformationSystemClient";
	                }
	            });
			}else{
				Ext.util.Cookies.clear("userName");
				window.location.href = window.location.protocol + "//" 
					+ window.location.host + "/InformationSystemClient";
			}
        }
    });
});
