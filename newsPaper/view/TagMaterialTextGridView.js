/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.TagMaterialTextGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.tagMaterialTextGridView',
    id: 'tagMaterialTextGridView',
    title: '文本素材列表',
    store: 'TagMaterialTextGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '标题',
            dataIndex: 'title',
            flex: 2
        },
        {
            text: '文本内容',
            dataIndex: 'text',
            flex: 4,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '文本内容不能为空!'
            }
        },
        {
            text: '图片个数',
            dataIndex: 'childCount',
            flex: 1
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
            store: 'TagMaterialTextGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        { itemId: 'addTagMaterialText', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeTagMaterialText', xtype: 'button', text: '删除', iconCls: 'Delete' }

    ]
});