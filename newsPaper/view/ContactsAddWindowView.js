/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.ContactsAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'contactsAddWindowView',
    title: '增加通讯录人员',
    modal: true,
    width: 350,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'contactsAddForm',
        bodyPadding: 5,
        url: '/newsPaper/contacts/addContacts',

        defaultType: 'textfield',
        items: [
            {
                fieldLabel: '姓名',
                name: 'name',
                allowBlank: false,
                blankText: '姓名不能为空!'
            },
            {
                fieldLabel: '身份证号',
                name: 'idCard',
                allowBlank: false,
                blankText: '身份证号不能为空!',
                regex: /^(^\d{15}$|^\d{17}(\d|X|x))$/,
                regexText: '身份证号格式错误!'
            },
            {
                fieldLabel: '手机号',
                name: 'phone',
                allowBlank: false,
                blankText: '手机号不能为空!'
            },
            {
                fieldLabel: '邮箱',
                name: 'email'
            }
        ],
        buttons: [
            {
                itemId: 'contactsAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'contactsAddFormReset',
                text: '重置'
            }
        ]
    }

});