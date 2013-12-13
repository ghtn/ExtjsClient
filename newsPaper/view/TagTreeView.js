/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.TagTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.tagTreeView',
    id: 'tagTreeView',
    hideHeaders: true,
    rootVisible: true,
    border: false,
    store: 'TagTreeStore',
    tbar: [
        { itemId: 'addTag', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeTag', xtype: 'button', text: '删除', iconCls: 'Delete' }
    ],
    columns: [
        {
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1,
            editor: {
                xtype: 'textfield',
                selectOnFocus: true,
                allowBlank: false,
                blankText: '标签名称不能为空！'
            }
        }
    ],
    selType: 'cellmodel',
    plugins: [
        {
            ptype: 'cellediting',
            clicksToEdit: 2
        }
    ]
});