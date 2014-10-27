/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.EmployeeImportWindowView', {
    extend: 'Ext.window.Window',
    id: 'employeeImportWindowView',
    alias: 'widget.employeeImportWindowView',
    title: '导入员工',
    modal: true,
    width: 300,
    height:200,
    bodyPadding: 10,
    closable: true,
    layout: {
	    type: 'vbox',
	    align: 'center'
	},
    items: {
    	xtype: 'form',
        frame:true,
		margin:'50 0 0 0',
        itemId: 'employeeImportForm',
        url: '../employee/uploadFile',
        items: [
            {
                xtype: 'filefield',
                name: 'file',
                itemId: 'employeeFileField',
                fieldLabel: '上传并导入',
                anchor: '100%',
                allowBlank: false,
                buttonText: '选择',
                buttonOnly: true
            }
        ]
    }

});