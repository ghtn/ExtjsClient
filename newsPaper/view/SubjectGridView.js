/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.SubjectGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.subjectGridView',
    id: 'subjectGridView',
    store: 'SubjectGridStore',
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
            dataIndex: 'creatTime',
            flex: 3
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'SubjectGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        { itemId: 'addSubject', xtype: 'button', text: '增加', iconCls: 'Add' },
        { itemId: 'removeSubject', xtype: 'button', text: '删除', iconCls: 'Delete' },
        { itemId: 'importSubject', xtype: 'button', text: '导入', iconCls: 'Pageexcel' },
        '->',
        {itemId: 'downloadSubjectTemplate', xtype: 'button', text: '下载导入模板', iconCls: 'Packagedown'}
    ]
});