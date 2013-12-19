/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.TagMaterialImageGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tagMaterialImageGridView',
    id: 'tagMaterialImageGridView',
    title: '图片素材列表',
    store: 'TagMaterialImageGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '标题',
            dataIndex: 'title',
            flex: 2,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '标题不能为空!'
            }
        },
        {
            text: '图片路径',
            dataIndex: 'image',
            flex: 4,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '图片路径不能为空!'
            }
        },
        {
            text: '文本素材标题',
            dataIndex: 'parentTitle',
            flex: 2
        },
        {
            text: '标签',
            dataIndex: 'tagNameStr',
            flex: 2
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'TagMaterialImageGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        { itemId: 'addTagMaterialImage', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeTagMaterialImage', xtype: 'button', text: '删除', iconCls: 'Delete' }
    ]
});