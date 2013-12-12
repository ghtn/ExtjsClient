/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MaterialImageAddWindowView', {
    extend: 'Ext.window.Window',
    id: 'materialImageAddWindowView',
    title: '增加图片素材',
    modal: true,
    width: 450,
    height: 500,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'materialImageAddForm',
        bodyPadding: 5,
        url: '/newsPaper/material/addMaterialImage',

        items: [
            {
                xtype: 'combo',
                fieldLabel: '所属文本素材',
                name: 'parent.id',
                store: 'MaterialTextGridStore',
                editable: false,
                valueField: 'id',
                displayField: 'title',
                anchor: '100%',
                allowBlank: false,
                blankText: '必须选择文本素材!'
            },
            {
                xtype: 'textfield',
                fieldLabel: '标题',
                name: 'title',
                anchor: '100%',
                allowBlank: false,
                blankText: '标题不能为空!'
            },
            {
                xtype: 'form',
                itemId: 'imageForm',
                border: false,
                url: '/newsPaper/material/uploadImage',
                items: [
                    {
                        xtype: 'filefield',
                        itemId: 'imageUpload',
                        fieldLabel: '上传图片',
                        anchor: '100%',
                        name: 'imageFile',
                        allowBlank: false,
                        buttonText: '选择图片素材',
                        regex: /\.(jpg|jpeg|gif|png|JPG|JPEG|GIF|PNG)$/,
                        regexText: '请选择正确的图片格式!(jpg或gif或png)'
                    }
                ]
            },
            {
                xtype: 'image',
                itemId: 'imageView',
                width: 330,
                height: 330,
                style: {
                    'display': 'block',
                    margin: 'auto'
                }
            }
        ],
        buttons: [
            {
                itemId: 'materialImageAddFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'materialImageAddFormReset',
                text: '重置'
            }
        ]
    }

});