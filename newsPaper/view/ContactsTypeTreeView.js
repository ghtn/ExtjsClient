/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ContactsTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.contactsTypeTreeView',
    id: 'contactsTypeTreeView',
    title: '通讯录类别',
    hideHeaders: true,
    rootVisible: true,
    border: false,
    store: 'ContactsTypeTreeStore',
    tbar: [
        { itemId: 'addContactsType', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeContactsType', xtype: 'button', text: '删除', iconCls: 'Delete' }
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
                blankText: '通讯录类别不能为空！'
            }
        }
    ],
    selType: 'cellmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        })
    ]
});