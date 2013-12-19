/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.TagMaterialTextEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'tagMaterialTextEditWindowView',
    title: '编辑文本素材',
    modal: true,
    width: 600,
    height: 520,
    autoScroll: true,
    closable: true,
    items: {
        xtype: 'form',
        itemId: 'materialTextEditForm',
        bodyPadding: 5,
        url: '/newsPaper/material/updateMaterialText',

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
                columns: 3
            }
        ],
        buttons: [
            {
                itemId: 'tagMaterialTextEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'tagMaterialTextEditFormReset',
                text: '重置'
            }
        ]
    }

});