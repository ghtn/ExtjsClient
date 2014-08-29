/**
 * 主界面controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 上午9:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'MainTreeView', 'MainTabpanelView', 'ModifyPasswordWindowView'],
    stores: ['MainTreeStore'],
    models: ['MainTreeModel'],

    init: function () {
        //init函数通过this.control来负责监听
        this.control({
            //可以通过别名或itemId设置需要监听的组建
            //别名：'别名'，itemId: '#itemId'
            'mainTreeView': {
                //监听鼠标点击事件，点击后调用changePage方法
                itemclick: this.showPage
            },
            '#logout':{	// 注销
            	click:this.logout
            },
            '#modifyPassword':{ // 修改密码
            	click:this.modifyPassword
            },
            '#modifyPasswordFormReset':{// 重置修改密码表单
            	click:this.modifyPasswordFormReset
            },
            '#modifyPasswordFormSubmit':{// 提交修改密码表单
            	click:this.modifyPasswordFormSubmit
            }
        });
    },
    
    modifyPassword:function(){
    	var userName = Ext.util.Cookies.get("userName");
    	var window = Ext.create('NewsPaper.view.ModifyPasswordWindowView').show();
    	window.down("#modifyPasswordName").setValue(Ext.util.Cookies.get("userName"));
    	window.down("#modifyPasswordNameHide").setValue(Ext.util.Cookies.get("userName"));
    },
    
    modifyPasswordFormReset:function(){
    	var window = Ext.getCmp('modifyPasswordWindowView');
    	window.down('#modifyPasswordForm').getForm().reset();
    	window.down("#modifyPasswordName").setValue(Ext.util.Cookies.get("userName"));
    	window.down("#modifyPasswordNameHide").setValue(Ext.util.Cookies.get("userName"));
    },
    
    modifyPasswordFormSubmit:function(){ 
    	var view = Ext.getCmp('modifyPasswordWindowView');
    	var form = view.down('#modifyPasswordForm').getForm();
    	Ext.MessageBox.confirm('确认修改', '确认修改密码?', function (btn) {
            if (btn == 'yes') {
            	var userName = Ext.util.Cookies.get("userName");
				if( userName == null){
					Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function(){
						window.location.href = window.location.protocol + "//" 
							+ window.location.host + "/InformationSystemClient";
					});
				}else{
		            form.submit({
			            waitMsg: '正在玩命修改...',
			            method:'post',
			            params:{
				        	userName:userName
						},
			            success: function (form, action) {
			            	if(action.result == true){
				            	Ext.example.msg('恭喜', '密码修改成功');
			            	}else{
				        		Ext.example.msg('遗憾', '密码修改失败');
			            	}
			        		view.close();
			            },
			            failure: function (form, action) {
			        		Ext.example.msg('遗憾', '密码修改失败');
			        		view.close();
			            }
			        });
				}
            }
        });
    },
    
    logout:function(){
		Ext.MessageBox.confirm('确认注销', '确认注销当前用户?', function (btn) {
			if (btn == 'yes') {
				var userName = Ext.util.Cookies.get("userName");
		    	Ext.util.Cookies.clear("userName");
		    	if( name != null && name != ""){
		    		Ext.Ajax.request({
		                url: '/InformationSystemService/user/logout',
		                method: 'post',
		                params: {
		                    userName:userName
		                },
		                success: function (response) {
		                	window.location.href = window.location.protocol + "//" 
								+ window.location.host + "/InformationSystemClient";
		                },
		                failure: function (response) {
		                	window.location.href = window.location.protocol + "//" 
								+ window.location.host + "/InformationSystemClient";
		                }
		            });
		    	}else{
                	window.location.href = window.location.protocol + "//" 
						+ window.location.host + "/InformationSystemClient";
		    	}
			}
		});
    	
    },

    /**
     * 点击左边的功能树, 在右边的功能区以标签页的形式展现
     * @param view
     * @param rec
     */
    showPage: function (view, rec) {
        if (rec.data.leaf == true) {
            var mainTabPanel = Ext.getCmp('mainTabpanelView');
            var tab = Ext.getCmp(rec.data.id);
            if (!tab) {
                tab = mainTabPanel.add({
                    id: rec.data.id,
                    title: rec.data.text,
                    xtype: rec.data.url,
                    closable: true
                });
            }else{
	            mainTabPanel.setActiveTab(tab);
				return ;// 已经打开tab别再刷新！            
            }
            mainTabPanel.setActiveTab(tab);

            var store;
            // 加载素材数据
            if (rec.data.id == 5) {
                store = Ext.data.StoreManager.lookup('MaterialTextGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                store = Ext.data.StoreManager.lookup('MaterialImageGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载素材类别, 用于在增加和编辑文本素材时取得素材类别的下拉框数据
                store = Ext.data.StoreManager.lookup('MaterialTypeStore');
                store.load();
            }

            // 加载通讯录数据
            if (rec.data.id == 10) {
                store = Ext.data.StoreManager.lookup('ContactsGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });
            }

            // 加载标签下的素材数据
            if (rec.data.id == 11) {
                // 加载文本素材
                store = Ext.data.StoreManager.lookup('TagMaterialTextGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载图片素材
                store = Ext.data.StoreManager.lookup('TagMaterialImageGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载素材类别, 用于在增加和编辑文本素材时取得素材类别的下拉框数据
                store = Ext.data.StoreManager.lookup('MaterialTypeStore');
                store.load();
            }
            
            // 人事信息, 加载人事数据
            if(rec.data.id == 501){
				store = Ext.data.StoreManager.lookup('EmployeeGridStore');
            	store.loadPage(1);
            }
            
            // 人员调动, 加载人事数据
            if(rec.data.id == 502){
				store = Ext.data.StoreManager.lookup('TransferGridStore');
            	store.loadPage(1);
            }
            
            // 人员离职, 加载离职人员
            if(rec.data.id == 503){
				store = Ext.data.StoreManager.lookup('DimissionGridStore');
            	store.loadPage(1);
            }
            
            // 人员复职, 加载复职人员
            if(rec.data.id == 504){
				store = Ext.data.StoreManager.lookup('RestoralGridStore');
            	store.loadPage(1);
            }
            
            // 退休管理, 加载未退休人员
            if(rec.data.id == 505){
				store = Ext.data.StoreManager.lookup('RetireGridStore');
				store.loadPage(1);
            }
            
            // 合同管理, 加载合同信息
            if(rec.data.id == 506){
				store = Ext.data.StoreManager.lookup('ContractGridStore');
				store.loadPage(1);
            }
            
            
			// 加载题库数据
            if (rec.data.id == 401) {
                store = Ext.data.StoreManager.lookup('SubjectGridStore');
                // 参数在grid渲染之后通过store的beforeload事件添加
                store.loadPage(1);
            }

            // 制作试卷, 加载题库数据
            if (rec.data.id == 402) {
                store = Ext.data.StoreManager.lookup('MakePaperSubjectGridStore');
                store.load();
            }

            // 试卷管理, 加载试卷数据
            if (rec.data.id == 403) {
                store = Ext.data.StoreManager.lookup('PaperGridStore');
                store.load();
            }

            // 考试管理, 加载考试数据
            if (rec.data.id == 404) {
                store = Ext.data.StoreManager.lookup('ExamGridStore');
                store.load();
            }

            // 成绩管理, 加载考试成绩数据
            if (rec.data.id == 405) {
                store = Ext.data.StoreManager.lookup('ScoreGridStore');
                store.load();
            }
        }
    }
});