/**
 * 主界面controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 上午9:11 To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.controller.MainController', {
	extend : 'Ext.app.Controller',
	views : ['Viewport', 'MainTreeView', 'MainTabpanelView',
			'ModifyPasswordWindowView'],
	stores : ['MainTreeStore'],
	models : ['MainTreeModel'],

	init : function() {
		// init函数通过this.control来负责监听
		this.control({
					// 可以通过别名或itemId设置需要监听的组建
					// 别名：'别名'，itemId: '#itemId'
					'mainTreeView' : {
						// 监听鼠标点击事件，点击后调用changePage方法
						itemclick : this.showPage
					},
					'#logout' : { // 注销
						click : this.logout
					},
					'#modifyPassword' : { // 修改密码
						click : this.modifyPassword
					},
					'#modifyPasswordFormReset' : {// 重置修改密码表单
						click : this.modifyPasswordFormReset
					},
					'#modifyPasswordFormSubmit' : {// 提交修改密码表单
						click : this.modifyPasswordFormSubmit
					}
				});

		// load回调函数
		Ext.data.StoreManager.lookup('MainTreeStore').load({
					params : {
						account : user.account
					}
				});
	},

	modifyPassword : function() {
		var window = Ext.create('NewsPaper.view.ModifyPasswordWindowView')
				.show();
	},

	modifyPasswordFormReset : function() {
		var window = Ext.getCmp('modifyPasswordWindowView');
		window.down('#modifyPasswordForm').getForm().reset();
	},

	modifyPasswordFormSubmit : function() {
		if (getCookie("ghtn_user") != "") {
			var view = Ext.getCmp('modifyPasswordWindowView');
			var form = view.down('#modifyPasswordForm').getForm();
			form.submit({
						waitMsg : '正在修改密码...',
						method : 'post',
						params : {
							account : user.account
						},
						success : function(form, action) {
							if (action.result == true) {
								Ext.example.msg('恭喜', '密码修改成功');
							} else {
								Ext.example.msg('遗憾', '密码修改失败');
							}
							view.close();
						},
						failure : function(form, action) {
							Ext.example.msg('遗憾', '密码修改失败');
							view.close();
						}
					});
		} else {
			Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function() {
						user = "";
						window.location.href = "login.jsp";
					});
		}
	},

	logout : function() {
		if (user != "") {
			Ext.Ajax.request({
						url : '/InformationSystemService/user/logout',
						method : 'post',
						params : {
							account : user.account
						},
						success : function(response) {
						},
						failure : function(response) {
						}
					});
		}
		setCookie("ghtn_user", "", -1);
		user = "";
		window.location.href = "login.jsp";

	},

	/**
	 * 点击左边的功能树, 在右边的功能区以标签页的形式展现
	 * 
	 * @param view
	 * @param rec
	 */
	showPage : function(view, rec) {
		if (rec.data.leaf == true) {
			var mainTabPanel = Ext.getCmp('mainTabpanelView');
			var tab = Ext.getCmp(rec.data.id);
			if (!tab) {
				tab = mainTabPanel.add({
							id : rec.data.id,
							title : rec.data.text,
							xtype : rec.data.url,
							closable : true
						});
			}
			mainTabPanel.setActiveTab(tab);

			var store;

			// 用户管理
			if (rec.data.id == 701) {
				store = Ext.data.StoreManager.lookup('UserStore');
				store.loadPage(1);
			}

			// 权限管理
			if (rec.data.id == 702) {
				store = Ext.data.StoreManager.lookup('UserStore');
				store.loadPage(1);
			}

			// 数据源维护
			if (rec.data.id == 71) {
				store = Ext.data.StoreManager.lookup('SourceStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'source'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext
											.getCmp('sourceEditPanelView')
											.down('#sourceList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}
			// 职务维护
			if (rec.data.id == 72) {
				store = Ext.data.StoreManager.lookup('DutyStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'duty'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext.getCmp('dutyEditPanelView')
											.down('#dutyList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}
			// 职称维护
			if (rec.data.id == 73) {
				store = Ext.data.StoreManager.lookup('JobTitleStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'jobTitle'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext
											.getCmp('jobTitleEditPanelView')
											.down('#jobTitleList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}
			// 工别维护
			if (rec.data.id == 74) {
				store = Ext.data.StoreManager.lookup('JobDistStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'jobDist'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext
											.getCmp('jobDistEditPanelView')
											.down('#jobDistList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}
			// 工种维护
			if (rec.data.id == 75) {
				store = Ext.data.StoreManager.lookup('JobTypeStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'jobType'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext
											.getCmp('jobTypeEditPanelView')
											.down('#jobTypeList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}
			// 生产线维护
			if (rec.data.id == 76) {
				store = Ext.data.StoreManager.lookup('ProductionLineStore');
				// load回调函数
				store.load({
							params : {
								account : user.account,
								fieldName : 'productionLine'
							},
							callback : function(records, opts, success) {
								if (success) {
									var list = Ext
											.getCmp('productionLineEditPanelView')
											.down('#productionLineList');
									list.removeAll();
									for (var i = 0; i < records.length; i++) {
										list.add({
													value : (i + 1)
															+ "、"
															+ records[i].data.value
												});
									}
								}
							}
						});
			}

			// 人事信息, 加载人事数据
			if (rec.data.id == 501) {
				store = Ext.data.StoreManager.lookup('EmployeeStore');
				store.reload();
			}

			// 人员调动, 加载人事数据
			if (rec.data.id == 502) {
				store = Ext.data.StoreManager.lookup('TransferEmployeeStore');
				store.reload();
			}

			// 人员离职, 加载离职人员
			if (rec.data.id == 503) {
				store = Ext.data.StoreManager.lookup('DimissionStore');
				store.reload();
			}

			// 人员复职, 加载复职人员
			if (rec.data.id == 504) {
				store = Ext.data.StoreManager.lookup('RestoralStore');
				store.reload();
			}

			// 查询证书
			if (rec.data.id == 602) {
				store = Ext.data.StoreManager.lookup('ContractQueryGridStore');
				store.loadPage(1);
			}

			// 删除证书
			if (rec.data.id == 603) {
				store = Ext.data.StoreManager.lookup('ContractRemoveGridStore');
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
				store = Ext.data.StoreManager
						.lookup('MakePaperSubjectGridStore');
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