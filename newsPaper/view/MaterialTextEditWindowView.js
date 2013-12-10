/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MaterialTextEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'materialTextEditWindowView',
    title: '编辑文本素材',
    modal: true,
    width: 450,
    height: 500,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        id: 'materialTextEditForm',
        bodyPadding: 5,
        url: '/newsPaper/material/updateMaterial',

        defaultType: 'textfield',
        items: [
            {
                fieldLabel: '标题',
                name: 'title',
                anchor: '100%',
                allowBlank: false,
                blankText: '标题不能为空!'
            },
            {
                xtype: 'textareafield',
                fieldLabel: '文本内容',
                anchor: '100% 90%',
                name: 'text',
                allowBlank: false,
                blankText: '文本内容不能为空!'
            }
        ],
        buttons: [
            {
                itemId: 'materialTextEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'materialTextEditFormReset',
                text: '重置'
            }
        ]
    }

});