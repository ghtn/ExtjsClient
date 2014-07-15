/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ScoreGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.scoreGridView',
    id: 'scoreGridView',
    store: 'ScoreGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '身份证号',
            dataIndex: 'idCard',
            flex: 4
        },
        {
            text: '姓名',
            dataIndex: 'name',
            flex: 2
        },
        {
            text: '部门',
            dataIndex: 'deptName',
            flex: 2
        },
        {
            text: '员工号',
            dataIndex: 'empNumber',
            flex: 2
        },
        {
            text: '考试名称',
            dataIndex: 'examName',
            flex: 2
        },
        {
            text: '考试分数',
            dataIndex: 'examScore',
            flex: 2
        },
        {
            text: '及格',
            dataIndex: 'passDesc',
            flex: 2
        },
        {
            text: '错题数',
            dataIndex: 'errorCount',
            flex: 2
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'ScoreGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        {
            xtype: 'textfield',
            itemId: 'idCard',
            fieldLabel: '&nbsp身份证号',
            labelWidth: 60
        },
        {
            xtype: 'textfield',
            itemId: 'name',
            fieldLabel: '姓名',
            labelWidth: 30,
            width: 100
        },
        {
            xtype: 'textfield',
            itemId: 'empNumber',
            fieldLabel: '员工号',
            labelWidth: 40,
            width: 120
        },
        {
            xtype: 'combo',
            itemId: 'examCombo',
            fieldLabel: '考试',
            labelWidth: 30,
            width: 200,
            store: 'ExamComboStore',
            editable: false,
            valueField: 'id',
            displayField: 'name'
        },
        {
            xtype: 'combo',
            itemId: 'passCombo',
            fieldLabel: '及格',
            labelWidth: 30,
            width: 100,
            store: 'PassComboStore',
            editable: false,
            valueField: 'value',
            displayField: 'text'
        },
        {
            itemId: 'filterScore', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
        },
        '-',
        { itemId: 'exportScore', xtype: 'button', text: '导出', iconCls: 'Pagewhiteexcel' }
    ]

});