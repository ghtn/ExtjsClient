/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.ExamGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.examGridView',
    id: 'examGridView',
    store: 'ExamGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '考试名称',
            dataIndex: 'name',
            flex: 4
        },
        {
            text: '考试地点',
            dataIndex: 'place',
            flex: 2
        },

        {
            text: '考试时间',
            dataIndex: 'examTime',
            flex: 2
        },
        {
            text: '创建者',
            dataIndex: 'creatorName',
            flex: 1
        },
        {
            text: '创建时间',
            dataIndex: 'createTime',
            flex: 2
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'ExamGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        {
            xtype: 'datefield',
            itemId: 'startDate',
            fieldLabel: '&nbsp创建日期',
            labelWidth: 60,
            format: 'Y-m-d',
            editable: false
        },
        '至',
        {
            xtype: 'datefield',
            itemId: 'endDate',
            format: 'Y-m-d',
            editable: false
        },
        '-',
        {
            itemId: 'filterExam', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
        },
        '-',
        { itemId: 'addExam', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeExam', xtype: 'button', text: '删除', iconCls: 'Delete' }
    ]

});