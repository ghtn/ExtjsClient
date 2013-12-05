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
    title: '通讯录列表',
    store: 'ContactsGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '姓名', dataIndex: 'name', flex: 2
        },
        {
            text: '身份证号', dataIndex: 'idCard', flex: 4
        },
        {
            text: '手机号', dataIndex: 'phone', flex: 3
        },
        {
            text: '邮箱', dataIndex: 'email', flex: 3
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'ContactsGridStore',
            displayInfo: true
        }
    ]
});