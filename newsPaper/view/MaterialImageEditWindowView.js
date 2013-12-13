/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.MaterialImageEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'materialImageEditWindowView',
    title: '增加图片素材',
    modal: true,
    width: 450,
    height: 500,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'materialImageEditForm',
        bodyPadding: 5,
        url: '/newsPaper/material/updateMaterialImage',

        items: [
            {
                xtype: 'combo',
                fieldLabel: '所属文本素材',
                name: 'parentId',
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
                itemId: 'editImageForm',
                border: false,
                url: '/newsPaper/material/uploadImageEdit',
                items: [
                    {
                        xtype: 'filefield',
                        itemId: 'editImageUpload',
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
                itemId: 'materialImageEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'materialImageEditFormReset',
                text: '重置'
            }
        ]
    }

});