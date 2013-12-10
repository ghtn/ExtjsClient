/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MaterialTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.materialTypeTreeView',
    id: 'materialTypeTreeView',
    hideHeaders: true,
    rootVisible: true,
    border: false,
    store: 'MaterialTypeTreeStore',
    tbar: [
        { itemId: 'addMaterialType', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeMaterialType', xtype: 'button', text: '删除', iconCls: 'Delete' }
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
                blankText: '素材类别不能为空！'
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