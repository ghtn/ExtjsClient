/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ContractAddController', {
	extend : 'Ext.app.Controller',
	views : ['ContractAddBaseContainer', 'ContractAddPanelContainer',
			'ContractAddPanelView'],
	init : function() {
		this.control({
					'#contractBankFormReset' : {// 重置
						click : this.contractBankFormReset
					},
					'#contractBankFormSubmit' : {// 提交
						click : this.contractBankFormSubmit
					}
				})
	},

	/**
	 * 提交
	 */
	contractBankFormSubmit : function() {
		var view = Ext.getCmp('contractAddPanelView');
		var form = view.down('#contractBankForm').getForm();
		if (form.isValid()) {// 这个是多余的，不过可以防止意外
			Ext.MessageBox.confirm('确认录入', '确认录入证书?', function(btn) {
				if (btn == 'yes') {
					// 检测是否为空
					var entryDateBank = view.down("#entryDateBank");

					if (entryDateBank.getValue() == null) {
						entryDateBank.name = "";
					}

					if (getCookie("ghtn_user") == "") {
						Ext.MessageBox.alert("警告", "您长时间未使用，请重新登录！",
								function() {
									window.location.href = "login.jsp";
								});
					} else {
						form.submit({
							waitMsg : '正在添加人员...',
							params : {
								account : user.account
							},
							success : function(form, action) {
								Ext.example.msg('恭喜', '添加成功');
							},
							failure : function(form, action) {
								Ext.example.msg('对不起', "添加失败！");
							}
						});
					}
				}
			});
		}
	},

	/**
	 * 重置
	 */
	contractBankFormReset : function() {
		Ext.getCmp('contractAddPanelView').down('#contractBankForm').getForm()
				.reset();
	}

});
