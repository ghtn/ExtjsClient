/**
 * 试题库controller Created with IntelliJ IDEA. User: Administrator Date: 13-12-2
 * Time: 下午4:28 To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.GradeController', {
	extend : 'Ext.app.Controller',
	views : ['GradeBaseContainer', 'GradeEditWindowView', 'GradeGridContainer',
			'GradeGridView'],
	stores : ['UserStore', 'FilterUserStore'],
	models : ['UserModel', 'BaseModel'],

	init : function() {
		this.control({
					'gradeGridView' : {
						itemdblclick : this.showGradeEditWindow,// 编辑
						render : this.gradeGridRender
					},
					'#filterGrade' : { // 条件查询
						click : this.filterGrade
					},
					'#resetFilterGrade' : { // 清空查询条件
						click : this.resetFilterGrade
					},
					'#geadrEditFormSubmit' : {// 提交
						click : this.geadrEditFormSubmit
					}
				})
	},

	geadrEditFormSubmit : function() {
		var view = Ext.getCmp('gradeEditWindowView');
		var grade = 0;
		for (var i = 0; i < 12; i++) {
			if (view.down("#grade" + i).getValue()) {
				var temp = 1;
				for (var j = 0; j < i; j++) {
					temp *= 2;
				}
				grade += temp;
			}
		}
		var progress = Ext.MessageBox.wait('正在修改权限', '提交', {
					text : '修改中...'
				});
		Ext.Ajax.request({
			url : '/InformationSystemService/user/updateGrade',
			method : 'post',
			params : {
				account : user.account,
				_account : view.down("#account").getValue(),
				grade : grade
			},
			success : function(response) {
				progress.close();
				var result = Ext.JSON.decode(response.responseText);
				if (result.success) {
					Ext.example.msg('恭喜', '修改成功！');
					Ext.data.StoreManager.lookup('UserStore').reload();
					view.close();
				} else {
					Ext.example.msg('对不起', '修改失败！');
					view.close();
				}
			},
			failure : function(response) {
				progress.close();
				Ext.example.msg('对不起', '修改失败！');
				view.close();
			}
		});
	},

	showGradeEditWindow : function(view, record) {
		var view = Ext.create('NewsPaper.view.GradeEditWindowView').show();
		view.down('form').loadRecord(record);
		var grade = record.data.grade;
		if (grade != 99999) {
			var s = Math.floor(grade / 2);
			var count = 0;
			var flag = new Array();
			var count = 0;
			while (grade != 0) {
				flag[count++] = grade % 2;
				grade = s;
				s = Math.floor(grade / 2);
			}
			for (var i = 0; i < count; i++) {
				view.down("#grade" + i).setRawValue(flag[i]);
			}
		} else {
			for (var i = 0; i < 12; i++) {
				view.down("#grade" + i).setRawValue(1);
			}
		}
	},

	gradeGridRender : function(grid) {
		var store = grid.getStore();
		store.on('beforeload', function() {
					var condition = grid.down('#filterGradeCondition')
					var value = grid.down('#filterGradeValue')
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

	filterGrade : function() {
		Ext.getCmp('gradeGridView').getStore().loadPage(1);
	},
	resetFilterGrade : function() {
		var grid = Ext.getCmp('gradeGridView');
		grid.down('#filterGradeCondition').reset();
		grid.down('#filterGradeValue').reset();
	}
});
