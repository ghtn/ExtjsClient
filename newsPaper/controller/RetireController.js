/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.RetireController', {
    extend: 'Ext.app.Controller',
    views: ['RetireBaseContainer', 'RetireGridContainer', 'RetireGridView'],
    stores: [ 'RetireGridStore', 'FilterEmployeeStore'],
    models: [ 'EmployeeGridModel', 'FilterEmployeeModel'],

    init: function () {
        this.control({
            'retireGridView': {
                render: this.retireGridRender
            },
            '#filterRetireEmployee':{	// 条件查询
            	click: this.filterRetireEmployee
            },
            '#resetFilterRetireEmployee':{	// 清空查询条件
            	click: this.resetFilterRetireEmployee
            },
            '#retireEmployee':{ // 退休(离职)
            	click:this.retireEmployee
            }
        })
    },


    retireGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function(){
        	var queryCondition = grid.down('#filterRetireEmployeeCondition')
	        var queryValue = grid.down('#filterRetireEmployeeValue')
			if( queryCondition != null ){
	    	    queryCondition = queryCondition.getValue();
			}
			if( queryValue != null ){
	    	    queryValue = queryValue.getValue();
			}
	        var typeParam = {
	            queryCondition: queryCondition,
	            queryValue: queryValue,
	            postState:"在职",
	            retire:"退休"
	        };
	        Ext.apply(store.proxy.extraParams, typeParam);
        });
    },
    
    filterRetireEmployee:function(){
		var grid = Ext.getCmp('retireGridView');
        var queryCondition = grid.down('#filterRetireEmployeeCondition').getValue();
        if(queryCondition == null || queryCondition+'' == ''){
        	Ext.MessageBox.alert("提示", "请先选择查询条件！");
        }else{
	    	grid.getStore().loadPage(1);
        }
    },
    resetFilterRetireEmployee:function(){
		var grid = Ext.getCmp('retireGridView');
        grid.down('#filterRetireEmployeeCondition').reset();
        grid.down('#filterRetireEmployeeValue').reset();
    },
    
    retireEmployee: function(){
		var grid = Ext.getCmp('retireGridView');
        var record = grid.getSelectionModel().getSelection()[0];
        if (record) {	
	        var ids = record.data.id;
	        for(var i = 1; i < grid.getSelectionModel().getSelection().length; i++){
		        var rec = grid.getSelectionModel().getSelection()[i];
	        	ids += "#" + rec.data.id;
	        }
            Ext.MessageBox.confirm('确认退休', '确认退休所选择的人员?', function (btn) {
                if (btn == 'yes') {
                	var retireGridStore = Ext.data.StoreManager.lookup('RetireGridStore');
                    var progress = Ext.MessageBox.wait('正在退休所选择的人员', '提交', {
                        text: '退休中...'
                    });
                    Ext.Ajax.request({
                        url: '/InformationSystemService/employee/updateRestoralAndDimission',
                        method: 'post',
                        params: {
                            ids: ids,
                            postState:'离职'
                        },
                        success: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            if (result.success) {
                                Ext.example.msg('退休成功', result.msg);
                            } else {
                                Ext.MessageBox.alert('退休失败', result.msg);
                            }
                            retireGridStore.reload();
                        },
                        failure: function (response) {
                            progress.close();
                            var result = Ext.JSON.decode(response.responseText);
                            Ext.MessageBox.alert('退休失败', result.msg);
                        }
                    });
                }
            })
        } else {
            Ext.MessageBox.alert('错误', '请选择至少一条记录！');
        }
    }
});




