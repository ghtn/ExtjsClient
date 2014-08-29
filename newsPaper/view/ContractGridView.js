/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
 
Ext.define('NewsPaper.view.ContractGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contractGridView',
    id: 'contractGridView',
    store: 'ContractGridStore',
    columns: [
   		{xtype: 'rownumberer'},
        {
            text: 'ID',
            dataIndex: 'id',
            hidden:true,
            flex: 1
        },
        {
            text: '证书编号',
            dataIndex: 'number',
            flex: 1.3
        },
        {
            text: '证书类型',
            dataIndex: 'type',
            flex: 1.3
        },
        {
            text: '员工号',
            dataIndex: 'empNumber',
            flex: 1.3
        },
        {
            text: '姓名',
            dataIndex: 'name',
            flex: 0.8
        },
        {
            text: '身份证号',
            dataIndex: 'card',
            flex: 2
        },
        {
            text: '录入日期',
            dataIndex: 'entryDate',
            flex: 1.2
        },
        {
            text: '证书保存路径',
            dataIndex: 'path',
            hidden:true,
            flex: 2
        },
        {
            text: '预警',
            dataIndex: 'warn',
            hidden:true,
            flex: 1
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'ContractGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        ' ',
        {
            xtype: 'combo',
            itemId: 'filterContractCondition',
            fieldLabel: '查询条件',
            labelWidth: 55,
            width: 150,
            store: 'FilterContractStore',
            editable: false,
            valueField: 'value',
            displayField: 'disp'
        },
        {
        	xtype:'textfield',
        	itemId:'filterContractValue',
        	fieldLabel: ' ',
        	labelWidth: 5,
            width: 130
        },
        '-',
        {
            itemId: 'filterContract', xtype: 'button', text: '查询', iconCls: 'Arrowrefresh'
        },
        '-',
        {
            itemId: 'resetContract', xtype: 'button', text: '清空', iconCls: 'Arrowundo'
        },
        '->',
        { itemId: 'addContract', xtype: 'button', text: '录入', iconCls: 'Add' },
        '-',
        { itemId: 'removeContract', xtype: 'button', text: '删除', iconCls: 'Delete' }
        
    ]

});