/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MaterialTextGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.materialTextGridView',
    id: 'materialTextGridView',
    title: '文本素材列表',
    store: 'MaterialTextGridStore',
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
            store: 'MaterialTextGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        { itemId: 'addMaterialText', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeMaterialText', xtype: 'button', text: '删除', iconCls: 'Delete' }

    ]
});