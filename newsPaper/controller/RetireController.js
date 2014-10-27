/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.RetireController', {
	extend : 'Ext.app.Controller',
	views : ['RetireBaseContainer', 'RetireGridContainer', 'RetireGridView'],
	stores : ['EmployeeStore', 'FilterEmployeeStore'],
	models : ['EmployeeModel', 'BaseModel'],

	init : function() {
		this.control({
					'retireGridView' : {
						render : this.retireGridRender
					},
					'#filterRetireEmployee' : { // 条件查询
						click : this.filterRetireEmployee
					},
					'#resetFilterRetireEmployee' : { // 清空查询条件
						click : this.resetFilterRetireEmployee
					},
					'#retireEmployee' : { // 退休(离职)
						click : this.retireEmployee
					}
				})
	},

	retireGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var queryCondition = grid
							.down('#filterRetireEmployeeCondition')
					var queryValue = grid.down('#filterRetireEmployeeValue')
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
							queryValue : queryValue
						};
						Ext.apply(store.proxy.extraParams, typeParam);
					}
				});
	},

	filterRetireEmployee : function() {
		Ext.getCmp('retireGridView').getStore().loadPage(1);
	},
	resetFilterRetireEmployee : function() {
		var grid = Ext.getCmp('retireGridView');
		grid.down('#filterRetireEmployeeCondition').reset();
		grid.down('#filterRetireEmployeeValue').reset();
	},

	retireEmployee : function() {
		var grid = Ext.getCmp('retireGridView');
		var record = grid.getSelectionModel().getSelection()[0];
		if (record) {
			var ids = record.data.id;
			for (var i = 1; i < grid.getSelectionModel().getSelection().length; i++) {
				var rec = grid.getSelectionModel().getSelection()[i];
				ids += "#" + rec.data.id;
			}
			Ext.MessageBox.confirm('确认退休', '确认退休所选择的人员?', function(btn) {
				if (btn == 'yes') {
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var store = Ext.data.StoreManager
								.lookup('EmployeeStore');
						var progress = Ext.MessageBox.wait('正在退休所选择的人员', '提交',
								{
									text : '退休中...'
								});
						Ext.Ajax.request({
									url : '/InformationSystemService/employee/updateRestoral',
									method : 'post',
									params : {
										account : user.account,
										ids : ids,
										postState : '离职'
									},
									success : function(response) {
										progress.close();
										var result = Ext.JSON
												.decode(response.responseText);
										if (result.success) {
											Ext.example.msg('恭喜', '退休成功！');
										} else {
											Ext.example.msg('对不起', '退休失败！');
										}
										store.reload();
									},
									failure : function(response) {
										progress.close();
										Ext.example.msg('对不起', '退休失败！');
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
