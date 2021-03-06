/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ContactsGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactsGridView',
    id: 'contactsGridView',
    store: 'ContactsGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '姓名',
            dataIndex: 'name',
            flex: 2,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '姓名不能为空!'
            }
        },
        {
            text: '身份证号',
            dataIndex: 'idCard',
            flex: 4,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '身份证号不能为空!',
                regex: /^(^\d{15}$|^\d{17}(\d|X|x))$/,
                regexText: '身份证号格式错误!'
            }
        },
        {
            text: '手机号',
            dataIndex: 'phone',
            flex: 3,
            editor: {
                xtype: 'textfield',
                allowBlank: false,
                blankText: '手机号不能为空!'
            }
        },
        {
            text: '邮箱', dataIndex: 'email', flex: 4, editor: 'textfield'
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'ContactsGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        { itemId: 'addContacts', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeContacts', xtype: 'button', text: '删除', iconCls: 'Delete' },
        { itemId: 'importContacts', xtype: 'button', text: '导入', iconCls: 'Pageexcel' },
        '->',
        {itemId: 'downloadTemplate', xtype: 'button', text: '下载导入模板', iconCls: 'Packagedown'}
    ],
    selType: 'cellmodel',
    plugins: [
        {
            pluginId: 'rowPlugin',
            ptype: 'rowediting',
            clicksToEdit: 2
        }
    ]
});