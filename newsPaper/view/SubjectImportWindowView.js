/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.SubjectImportWindowView', {
    extend: 'Ext.window.Window',
    id: 'subjectImportWindowView',
    alias: 'widget.subjectImportWindowView',
    title: '导入试题',
    modal: true,
    width: 300,
    bodyPadding: 10,
    closable: true,
//    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'subjectImportForm',
        bodyPadding: 5,
        url: '/InformationSystemService/subject/uploadFile',

        items: [
            {
                xtype: 'filefield',
                name: 'file',
                itemId: 'fileField',
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
                itemId: 'startImportSubjects',
                text: '导入',
                disabled: true
            }
        ]
    }

});