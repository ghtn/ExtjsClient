/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContractRemoveController', {
	extend : 'Ext.app.Controller',
	views : ['ContractRemoveBaseContainer', 'ContractRemoveGridContainer',
			'ContractRemoveGridView'],
	stores : ['ContractRemoveGridStore', 'FilterContractStore'],
	models : ['ContractGridModel', 'BaseModel'],

	init : function() {
		this.control({
					'contractRemoveGridView' : {
						render : this.contractRemoveGridRender
					},
					'#filterContractRemove' : { // 条件查询
						click : this.filterContractRemove
					},
					'#resetContractRemove' : { // 清空查询条件
						click : this.resetFilterContractRemove
					},
					'#removeContract' : {// 删除证书
						click : this.removeContract
					}
				})
	},

	/**
	 * 删除证书
	 */
	removeContract : function() {
		var grid = Ext.getCmp('contractRemoveGridView');
		var record = grid.getSelectionModel().getSelection()[0];
		if (record) {
			var ids = record.data.id;
			for (var i = 1; i < grid.getSelectionModel().getSelection().length; i++) {
				var rec = grid.getSelectionModel().getSelection()[i];
				ids += "#" + rec.data.id;
			}
			// alert(ids);
			Ext.MessageBox.confirm('确认删除', '确认删除所选择的证书?', function(btn) {
				if (btn == 'yes') {
					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						var store = Ext.data.StoreManager
								.lookup('ContractRemoveGridStore');
						var progress = Ext.MessageBox.wait('正在删除所选择的证书', '提交',
								{
									text : '删除中...'
								});
						Ext.Ajax.request({
									url : '../contract/remove',
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
											Ext.example.msg('恭喜', '删除成功！');
										} else {
											Ext.example.msg('对不起', '删除失败！');
										}
										store.reload();
									},
									failure : function(response) {
										progress.close();
										Ext.example.msg('对不起', '删除失败!');
									}
								});
					}
				}
			})
		} else {
			Ext.MessageBox.alert('对不起', '至少选择一条记录！');
		}
	},

	/**
	 * 条件查询
	 */
	filterContractRemove : function() {
		Ext.getCmp('contractRemoveGridView').getStore().loadPage(1);
	},

	/**
	 * 清空查询条件
	 */
	resetFilterContractRemove : function() {
		var grid = Ext.getCmp('contractRemoveGridView');
		grid.down('#filterContractRemoveCondition').reset();
		grid.down('#filterContractRemoveValue').reset();
	},

	contractRemoveGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
			var queryCondition = grid.down('#filterContractRemoveCondition')
			var queryValue = grid.down('#filterContractRemoveValue')
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
	}
});
