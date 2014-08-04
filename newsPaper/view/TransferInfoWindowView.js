/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.TransferInfoWindowView', {
    extend: 'Ext.window.Window',
    id: 'transferInfoWindowView',
    title: '调动详情',
    modal: true,
    width: 850,
    height: 600,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items:{
    	xtype:"form",
    	itemId: 'trandferInfoForm',
    	bodyPadding: 10,
        autoScroll : true,
		frame : true,
		layout : 'form'
    }
});