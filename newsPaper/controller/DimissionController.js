/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.DimissionController', {
	extend : 'Ext.app.Controller',
	views : ['DimissionBaseContainer', 'DimissionGridContainer',
			'DimissionGridView'],
	stores : ['DimissionStore', 'FilterEmployeeStore'],
	models : ['EmployeeModel', 'BaseModel'],

	init : function() {
		this.control({
					'dimissionGridView' : {
						render : this.dimissionGridRender
					},
					'#filterDimissionEmployee' : { // 条件查询
						click : this.filterDimissionEmployee
					},
					'#resetFilterDimissionEmployee' : { // 清空查询条件
						click : this.resetFilterDimissionEmployee
					},
					'#dimissionEmployee' : { // 离职
						click : this.dimissionEmployee
					}
				})
	},

	dimissionGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var queryCondition = grid
							.down('#filterDimissionEmployeeCondition')
					var queryValue = grid.down('#filterDimissionEmployeeValue')
					if (queryCondition != null) {
						queryCondition = queryCondition.getValue();
					}
					if (queryValue != null) {
						queryValue = queryValue.getValue();
					}
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var typeParam = {
							account : user.account,
							queryCondition : queryCondition,
							queryValue : queryValue,
							postState:'在职'
						};
						Ext.apply(store.proxy.extraParams, typeParam);
					}
				});
	},

	filterDimissionEmployee : function() {
		Ext.getCmp('dimissionGridView').getStore().loadPage(1);
	},
	resetFilterDimissionEmployee : function() {
		var grid = Ext.getCmp('dimissionGridView');
		grid.down('#filterDimissionEmployeeCondition').reset();
		grid.down('#filterDimissionEmployeeValue').reset();
	},

	dimissionEmployee : function() {
		var grid = Ext.getCmp('dimissionGridView');
		var record = grid.getSelectionModel().getSelection()[0];
		if (record) {
			var ids = record.data.id;
			for (var i = 1; i < grid.getSelectionModel().getSelection().length; i++) {
				var rec = grid.getSelectionModel().getSelection()[i];
				ids += "#" + rec.data.id;
			}
			Ext.MessageBox.confirm('确认离职', '确认离职所选择的人员?', function(btn) {
				if (btn == 'yes') {
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var store = Ext.data.StoreManager
								.lookup('DimissionStore');
						var progress = Ext.MessageBox.wait('正在离职所选择的人员', '提交',
								{
									text : '离职中...'
								});
						Ext.Ajax.request({
									url : '/InformationSystemService/employee/updateDimission',
									method : 'post',
									params : {
										ids : ids,
										account : user.account,
										postState : '离职'
									},
									success : function(response) {
										progress.close();
										var result = Ext.JSON
												.decode(response.responseText);
										if (result.success) {
											Ext.example.msg('恭喜', '离职成功！');
										} else {
											Ext.example.msg('对不起', '离职失败！');
										}
										store.reload();
									},
									failure : function(response) {
										progress.close();
										Ext.example.msg('对不起', '离职失败！');
									}
								});
					}
				}
			})
		} else {
			Ext.MessageBox.alert('对不起', '至少选择一条记录！');
		}
	}
});
