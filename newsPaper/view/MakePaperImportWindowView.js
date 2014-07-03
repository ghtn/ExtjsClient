/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MakePaperImportWindowView', {
    extend: 'Ext.window.Window',
    id: 'makePaperImportWindowView',
    alias: 'widget.makePaperImportWindowView',
    title: '导入试卷',
    modal: true,
    width: 300,
    bodyPadding: 10,
    closable: true,
//    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'makePaperImportForm',
        bodyPadding: 5,
        url: '/InformationSystemService/paper/uploadFile',

        items: [
            {
                xtype: 'combo',
                fieldLabel: '部门',
                name: 'deptId',
                itemId: 'deptCombo',
                labelWidth: 70,
                store: 'DepartmentStore',
                editable: false,
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                allowBlank: false,
                blankText: '必须选择部门!'
            },
            {
                xtype: 'filefield',
                name: 'file',
                itemId: 'paperFileField',
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
                itemId: 'startImportPaper',
                text: '导入',
                disabled: true
            }
        ]
    }

});