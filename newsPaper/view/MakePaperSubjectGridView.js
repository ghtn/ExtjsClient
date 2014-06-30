/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MakePaperSubjectGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.makePaperSubjectGridView',
    id: 'makePaperSubjectGridView',
    store: 'MakePaperSubjectGridStore',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE'
    },
    columns: [
        {xtype: 'rownumberer'},
        {
            text: 'id', dataIndex: 'id', flex: 1
        },
        {
            text: '部门',
            dataIndex: 'deptName',
            flex: 2
        },
        {
            text: '题目描述',
            dataIndex: 'description',
            flex: 4
        },
        {
            text: '分值',
            dataIndex: 'mark',
            flex: 1
        },
        {
            text: '类型',
            dataIndex: 'typeDesc',
            flex: 2
        },
        {
            text: '创建者',
            dataIndex: 'creator',
            flex: 2
        },
        {
            text: '创建时间',
            dataIndex: 'createTime',
            flex: 3
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
    /*tbar: {
     xtype: 'container',
     border: false,
     items: [
     {
     xtype: 'toolbar',
     border: false,
     items: [
     {
     xtype: 'datefield',
     fieldLabel: ' 题库日期',
     labelWidth: 60,
     name: 'startDate',
     format: 'Y-m-d'
     },
     '到',
     {
     xtype: 'datefield',
     name: 'endDate',
     maxValue: new Date(),
     format: 'Y-m-d'
     }
     ]
     },
     {
     xtype: 'toolbar',
     border: false,
     items: [
     { itemId: 'addPaper', xtype: 'button', text: '生成试卷', iconCls: 'Pageadd' },
     { itemId: 'genPaper', xtype: 'button', text: '自动生成试卷', iconCls: 'Pagerefresh' },
     { itemId: 'importPaper', xtype: 'button', text: '导入试卷', iconCls: 'Pageexcel' },
     '->',
     {itemId: 'downloadPaperTemplate', xtype: 'button', text: '下载导入模板', iconCls: 'Packagedown'}
     ]
     }
     ]
     }*/
});