/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
 
Ext.define('NewsPaper.view.UserGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userGridView',
    id: 'userGridView',
    store: 'UserStore',
    columns: [
   		{xtype: 'rownumberer'},
        {
            text: 'ID',
            dataIndex: 'id',
            flex: 1
        },
        {
            text: '账号',
            dataIndex: 'account',
            flex: 1.3
        },
        {
            text: '权限',
            dataIndex: 'grade',
            flex: 0.8
        },
        {
            text: '职务',
            dataIndex: 'type',
            flex: 0.8
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'UserStore',
            displayInfo: true
        }
    ],
    tbar: [
    	' ',
        {
            xtype: 'combo',
            itemId: 'filterUserCondition',
            fieldLabel: '查询条件',
            labelWidth: 55,
            width: 150,
            store: 'FilterUserStore',
            editable: false,
            valueField: 'value',
            displayField: 'disp'
        },
        {
        	xtype:'textfield',
        	itemId:'filterUserValue',
        	fieldLabel: ' ',
        	labelWidth: 5,
            width: 130
        },
        '-',
        {
            itemId: 'filterUser', xtype: 'button', text: '查询', iconCls: 'Arrowrefresh'
        },
        '-',
        {
            itemId: 'resetFilterUser', xtype: 'button', text: '清空', iconCls: 'Arrowundo'
        },
        '->',
        { itemId: 'addUser', xtype: 'button', text: '增加', iconCls: 'Add' },
        '-',
        { itemId: 'removeUser', xtype: 'button', text: '删除', iconCls: 'Delete' },
        '-'
    ]

});