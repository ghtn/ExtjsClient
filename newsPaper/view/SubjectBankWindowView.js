/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.SubjectBankWindowView', {
    extend: 'Ext.window.Window',
    id: 'subjectBankWindowView',
    title: '题库',
    modal: true,
    width: 850,
    height: 600,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: [
        {
            xtype: 'grid',
            itemId: 'subjectBankGridView',
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
                    flex: 6
                },
                {
                    text: '分值',
                    dataIndex: 'mark',
                    flex: 1
                },
                {
                    text: '类型',
                    dataIndex: 'typeDesc',
                    flex: 1
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
                    itemId: 'filterSubjectBank', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
                },
                {
                    itemId: 'submitSubjectBank', xtype: 'button', text: '提交', iconCls: 'Accept'
                }
            ]
        }
    ]

});