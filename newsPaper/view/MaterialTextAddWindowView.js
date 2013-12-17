/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MaterialTextAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'materialTextAddWindowView',
    title: '增加文本素材',
    modal: true,
    width: 600,
    height: 500,
    autoScroll: true,
    closable: true,
    items: {
        xtype: 'form',
        itemId: 'materialTextAddForm',
        bodyPadding: 5,
        url: '/newsPaper/material/addMaterialText',

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
                anchor: '100%',
                height: 350,
                name: 'text',
                allowBlank: false,
                blankText: '文本内容不能为空!'
            },
            {
                xtype: 'checkboxgroup',
                itemId: 'textTagCheckGroup',
                fieldLabel: '标签',
                anchor: '100% 10%',
                columns: 3
            }
        ],
        buttons: [
            {
                itemId: 'materialTextAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'materialTextAddFormReset',
                text: '重置'
            }
        ]
    }

});