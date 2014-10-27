/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.UserController', {
	extend : 'Ext.app.Controller',
	views : ['UserBaseContainer', 'UserEditWindowView', 'UserGridContainer',
			'UserGridView', 'UserBankWindowView'],
	stores : ['UserStore', 'FilterUserStore', 'DutyStore'],
	models : ['UserModel', 'BaseModel'],

	init : function() {
		this.control({
					'userGridView' : {
						itemdblclick : this.showUserEditWindow,
						render : this.userGridRender
					},
					'#filterUser' : { // 条件查询
						click : this.filterUser
					},
					'#resetFilterUser' : { // 清空查询条件
						click : this.resetFilterUser
					},
					'#addUser' : { // 添加用户
						click : this.addUser
					},
					'#userBankFormReset' : { // 重置
						click : this.userBankFormReset
					},
					'#userBankFormSubmit' : { // 提交
						click : this.userBankFormSubmit
					},
					'#removeUser' : {// 删除用户
						click : this.removeUser
					},
					'#userEditFormSubmit' : {// 提交修改
						click : this.userEditFormSubmit
					}
				})
	},

	userEditFormSubmit : function() {
		var view = Ext.getCmp('userEditWindowView');
		var form = view.down('#userEditForm').getForm();
		var store = Ext.data.StoreManager.lookup('UserStore');
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			var _account = view.down("#_account").getValue();
			var password = view.down("#password").getValue();
			var rePassword = view.down("#rePassword").getValue();
			if (password != rePassword) {
				Ext.MessageBox.alert("对不起", "两次密码不一致！");
				return;
			}
			view.down("#_account").name = "";
			if (getCookie("ghtn_user") == "") {
				Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function() {
							window.location.href = "login.jsp";
						});
			} else {
				form.submit({
							waitMsg : '正在修改信息...',
							submitEmptyText : false,
							params : {
								account : user.account,
								_account : _account
							},
							success : function(form, action) {
								Ext.example.msg('恭喜', '修改成功!');
								view.close();
								store.reload();
							},
							failure : function(form, action) {
								Ext.example.msg('对不起', '修改失败!');
								view.close();
							}
						});
			}
		}
	},

	removeUser : function() {
		var grid = Ext.getCmp('userGridView');
		var record = grid.getSelectionModel().getSelection()[0];
		if (record) {
			var ids = record.data.id;
			for (var i = 1; i < grid.getSelectionModel().getSelection().length; i++) {
				var rec = grid.getSelectionModel().getSelection()[i];
				ids += "#" + rec.data.id;
			}
			Ext.MessageBox.confirm('确认删除', '确认删除所选择的用户?', function(btn) {
						if (btn == 'yes') {
							if (getCookie("ghtn_user") == "") {
								Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
										function() {
											window.location.href = "login.jsp";
										});
							} else {
								var store = Ext.data.StoreManager
										.lookup('UserStore');
								var progress = Ext.MessageBox.wait(
										'正在删除所选择的用户', '提交', {
											text : '删除中...'
										});
								Ext.Ajax.request({
											url : '/InformationSystemService/user/remove',
											method : 'post',
											params : {
												account : user.account,
												ids : ids
											},
											success : function(response) {
												progress.close();
												var result = Ext.JSON
														.decode(response.responseText);
												if (result.success) {
													Ext.example.msg('恭喜',
															'删除成功！');
												} else {
													Ext.example.msg('对不起',
															'删除失败！');
												}
												store.reload();
											},
											failure : function(response) {
												progress.close();
												var result = Ext.JSON
														.decode(response.responseText);
												Ext.example.msg('对不起', '删除失败！');

											}
										});
							}
						}
					})
		} else {
			Ext.MessageBox.alert('对不起', '至少选择一条记录！');
		}
	},

	userBankFormSubmit : function() {
		var view = Ext.getCmp('userBankWindowView');
		var form = view.down('#userBankForm').getForm();
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			if (getCookie("ghtn_user") == "") {
				Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！", function() {
							window.location.href = "login.jsp";
						});
			} else {
				var store = Ext.data.StoreManager.lookup('UserStore');
				form.submit({
							waitMsg : '正在添加用户...',
							params : {
								account : user.account
							},
							success : function(form, action) {
								Ext.example.msg('恭喜', '添加成功！');
								view.close();
								store.reload();
							},
							failure : function(form, action) {
								Ext.example.msg('对不起', '添加失败！');
								view.close();
							}
						});
			}
		}
	},

	userBankFormReset : function() {
		Ext.getCmp('userBankWindowView').down('#userBankForm').getForm()
				.reset();
	},

	showUserEditWindow : function(view, record) {
		var window = Ext.create('NewsPaper.view.UserEditWindowView').show();
		window.down('form').loadRecord(record);
		Ext.data.StoreManager.lookup('DutyStore').load({
					params : {
						account : user.account,
						fieldName : 'duty'
					}
				});
	},
	addUser : function() {
		Ext.create('NewsPaper.view.UserBankWindowView').show();
		Ext.data.StoreManager.lookup('DutyStore').load({
					params : {
						account : user.account,
						fieldName : 'duty'
					}
				});
	},

	userGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var condition = grid.down('#filterUserCondition')
					var value = grid.down('#filterUserValue')
					if (condition != null) {
						condition = condition.getValue();
					}
					if (value != null) {
						value = value.getValue();
					}
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var typeParam = {
							account : user.account,
							condition : condition,
							value : value
						};
						Ext.apply(store.proxy.extraParams, typeParam);
					}
				});
	},

	filterUser : function() {
		Ext.getCmp('userGridView').getStore().loadPage(1);
	},
	resetFilterUser : function() {
		var grid = Ext.getCmp('userGridView');
		grid.down('#filterUserCondition').reset();
		grid.down('#filterUserValue').reset();
	}
});
