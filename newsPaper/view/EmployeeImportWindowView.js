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
    bodyPadding: 10,
    closable: true,
//    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'employeeImportForm',
        bodyPadding: 5,
        url: '/InformationSystemService/employee/uploadFile',

        items: [
            {
                xtype: 'filefield',
                name: 'file',
                itemId: 'employeeFileField',
                fieldLabel: '上传',
                labelWidth: 70,
                anchor: '100%',
                allowBlank: false,
                buttonText: '选择',
                buttonOnly: true
            }
        ],
        buttons: [
            {
                itemId: 'startImportEmployees',
                text: '导入',
                disabled: true
            }
        ]
    }

});