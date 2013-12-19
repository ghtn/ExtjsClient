/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.TagMaterialImageEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'tagMaterialImageEditWindowView',
    title: '增加图片素材',
    modal: true,
    width: 600,
    height: 520,
    autoScroll: true,
    closable: true,
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
                store: 'TagMaterialTextGridStore',
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
            },
            {
                xtype: 'checkboxgroup',
                itemId: 'imageTagCheckGroup',
                fieldLabel: '标签',
                columns: 3
            }
        ],
        buttons: [
            {
                itemId: 'tagMaterialImageEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'tagMaterialImageEditFormReset',
                text: '重置'
            }
        ]
    }

});