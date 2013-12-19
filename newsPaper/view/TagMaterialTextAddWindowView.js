/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.TagMaterialTextAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'tagMaterialTextAddWindowView',
    title: '增加文本素材',
    modal: true,
    width: 600,
    height: 520,
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
                xtype: 'combo',
                fieldLabel: '素材类别',
                name: 'materialTypeId',
                store: 'MaterialTypeStore',
                editable: false,
                valueField: 'id',
                displayField: 'text',
                anchor: '100%',
                allowBlank: false,
                blankText: '必须选择素材类别!'
            },
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
                itemId: 'tagMaterialTextAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'tagMaterialTextAddFormReset',
                text: '重置'
            }
        ]
    }

});