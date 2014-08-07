/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.RestoralController', {
    extend: 'Ext.app.Controller',
    views: ['RestoralBaseContainer', 'RestoralGridContainer', 'RestoralGridView'],
    stores: [ 'RestoralGridStore', 'FilterEmployeeStore'],
    models: [ 'EmployeeGridModel', 'FilterEmployeeModel'],

    init: function () {
        this.control({
            'restoralGridView': {
                render: this.restoralGridRender
            },
            '#filterRestoralEmployee':{	// 条件查询
            	click: this.filterRestoralEmployee
            },
            '#resetFilterRestoralEmployee':{	// 清空查询条件
            	click: this.resetFilterRestoralEmployee
            },
            '#restoralEmployee':{	// 复职
            	click:this.restoralEmployee
            }
        })
    },


    restoralGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function(){
        	var queryCondition = grid.down('#filterRestoralEmployeeCondition')
	        var queryValue = grid.down('#filterRestoralEmployeeValue')
			if( queryCondition != null ){
	    	    queryCondition = queryCondition.getValue();
			}
			if( queryValue != null ){
	    	    queryValue = queryValue.getValue();
			}
	        var typeParam = {
	        	userName:Ext.util.Cookies.get("userName"),
	            queryCondition: queryCondition,
	            queryValue: queryValue,
	            postState:"离职"
	        };
	        Ext.apply(store.proxy.extraParams, typeParam);
        });
    },
    
    filterRestoralEmployee:function(){
		Ext.getCmp('restoralGridView').getStore().loadPage(1);
    },
    resetFilterRestoralEmployee:function(){
		var grid = Ext.getCmp('restoralGridView');
        grid.down('#filterRestoralEmployeeCondition').reset();
        grid.down('#filterRestoralEmployeeValue').reset();
    },
    
    restoralEmployee: function(){
		var grid = Ext.getCmp('restoralGridView');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {	
	        var ids = record.data.id;
	        for(var i = 1; i < grid.getSelectionModel().getSelection().length; i++){
		        var rec = grid.getSelectionModel().getSelection()[i];
	        	ids += "#" + rec.data.id;
	        }
            Ext.MessageBox.confirm('确认复职', '确认复职所选择的人员?', function (btn) {
                if (btn == 'yes') {
                	var restoralGridStore = Ext.data.StoreManager.lookup('RestoralGridStore');
                    var progress = Ext.MessageBox.wait('正在复职所选择的人员', '提交', {
                        text: '复职中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/employee/updateRestoralAndDimission',
                        method: 'post',
                        params: {
                        	userName:Ext.util.Cookies.get("userName"),
                            ids: ids,
                            postState:'在职'
                        },
                        success: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.example.msg('复职成功', result.msg);
                            } else {
                                Ext.MessageBox.alert('复职失败', result.msg);
                            }
                            restoralGridStore.reload();
                        },
                        failure: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('复职失败', result.msg);
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.alert('错误', '请选择至少一条记录！');
        }
    }
});




