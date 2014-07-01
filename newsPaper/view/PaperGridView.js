/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.PaperGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.paperGridView',
    id: 'paperGridView',
    store: 'PaperGridStore',
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '试卷名称',
            dataIndex: 'name',
            flex: 4
        },
        {
            text: '部门',
            dataIndex: 'deptName',
            flex: 2
        },

        {
            text: '满分',
            dataIndex: 'fullScore',
            flex: 1
        },
        {
            text: '及格分',
            dataIndex: 'passScore',
            flex: 1
        },
        {
            text: '试题数量',
            dataIndex: 'subNum',
            flex: 2
        },
        {
            text: '考试时长(分钟)',
            dataIndex: 'examTime',
            flex: 2
        },
        {
            text: '创建者',
            dataIndex: 'creator',
            flex: 1
        },
        {
            text: '创建时间',
            dataIndex: 'createTime',
            flex: 3
        },
        {
            text: '状态',
            dataIndex: 'statusDesc',
            flex: 1
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'PaperGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        {
            xtype: 'datefield',
            itemId: 'startDate',
            fieldLabel: '&nbsp题库日期',
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
        {
            itemId: 'filterSubject', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
        },
        '-',
        { itemId: 'addPaper', xtype: 'button', text: '生成试卷', iconCls: 'Pageadd' },
        { itemId: 'genPaper', xtype: 'button', text: '自动生成试卷', iconCls: 'Pagerefresh' },
        { itemId: 'importPaper', xtype: 'button', text: '导入试卷', iconCls: 'Pageexcel' },
        '->',
        {itemId: 'downloadPaperTemplate', xtype: 'button', text: '下载导入模板', iconCls: 'Packagedown'}
    ]

});