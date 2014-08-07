/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.TransferController', {
    extend: 'Ext.app.Controller',
    views: ['TransferBaseContainer', 'TransferGridContainer', 'TransferGridView', 'TransferInfoWindowView'],
    stores: [ 'TransferGridStore', 'TransferStore', 'FilterEmployeeStore'],
    models: [ 'EmployeeGridModel', 'TransferModel', 'FilterEmployeeModel'],

    init: function () {
        this.control({
            'transferGridView': {
            	itemdblclick: this.showTransferInfoWindow,// 调动详情
                render: this.transferGridRender
            },
            '#filterTransferEmployee':{	// 条件查询
            	click: this.filterTransferEmployee
            },
            '#resetFilterTransferEmployee':{	// 清空查询条件
            	click: this.resetFilterTransferEmployee
            }
        })
    },
    
    
    showTransferInfoWindow: function (view, record) {
    	// 显示window
	    var window = Ext.create('NewsPaper.view.TransferInfoWindowView').show();
	    // 拿到身份证号
	    var card = record.data.card;
	    // 准备好store
	    store = Ext.data.StoreManager.lookup('TransferStore');
		// load回调函数
	    store.load({params:{
	    	userName:Ext.util.Cookies.get("userName"),
	    	card:card
	    }, callback:function(records, opts, success){
		    // 把数据显示到form里
			var form = Ext.getCmp('transferInfoWindowView').down('#trandferInfoForm');
			if( success){
				
				// 如果没有调动详情， 显示相应的信息
				if( records.length == 0){
					form.add({
						xtype: 'displayfield',
				        fieldLabel: '对不起',
				        value: '暂时还没有该人员的调动过程'
					});
				}
				
				for(var i = 0; i < records.length; i++){
					form.add({
						xtype:'fieldset',
				        title: 'No.' + (i+1),
				        collapsible: true,
						defaultType: 'displayfield',
				        items:[
						    {
						        fieldLabel: '调动时间',
						        value: records[i].data.transDate
						    }, 
						    {
						        fieldLabel: '调动过程',
						        value: records[i].data.detail
					        }
				        ]
					});
				}
			}else{
				form.add({
					xtype: 'displayfield',
			        fieldLabel: '对不起',
			        value: '暂时还没有该人员的调动过程'
				});
			}
	    }});
	},


    transferGridRender: function (grid) {
        var store = grid.getStore();
        store.on('beforeload', function(){
        	var queryCondition = grid.down('#filterTransferEmployeeCondition')
	        var queryValue = grid.down('#filterTransferEmployeeValue')
			if( queryCondition != null ){
	    	    queryCondition = queryCondition.getValue();
			}
			if( queryValue != null ){
	    	    queryValue = queryValue.getValue();
			}
	        var typeParam = {
	        	userName:Ext.util.Cookies.get("userName"),
	            queryCondition: queryCondition,
	            queryValue: queryValue
	        };
	        Ext.apply(store.proxy.extraParams, typeParam);
        });
    },
   
    filterTransferEmployee:function(){
		Ext.getCmp('transferGridView').getStore().loadPage(1);
    },
    resetFilterTransferEmployee:function(){
		var grid = Ext.getCmp('transferGridView');
        grid.down('#filterTransferEmployeeCondition').reset();
        grid.down('#filterTransferEmployeeValue').reset();
    }
});




