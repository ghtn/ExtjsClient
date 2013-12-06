/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ContactsImportWindowView', {
    extend: 'Ext.window.Window',
    id: 'contactsImportWindowView',
    title: '导入通讯录人员',
    modal: true,
    width: 400,
    bodyPadding: 10,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        id: 'contactsImportForm',
        bodyPadding: 5,
        url: '/newsPaper/contacts/uploadFile',

        items: [
            {
                xtype: 'filefield',
                name: 'file',
                fieldLabel: '上传数据',
                labelWidth: 70,
                anchor: '100%',
                allowBlank: false,
                buttonText: '选择数据文件'
            }
        ],
        buttons: [
            {
                itemId: 'uploadFile',
                text: '上传',
                formBind: true,
                disabled: true
            },
            {
                id: 'startImportContacts',
                text: '导入',
                disabled: true
            }
        ]
    }

});