/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:15
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.SubjectTypeTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.subjectTypeTreeView',
    id: 'subjectTypeTreeView',
    hideHeaders: true,
    rootVisible: true,
    border: false,
    store: 'SubjectTypeTreeStore',
    columns: [
        {
            xtype: 'treecolumn',
            dataIndex: 'text',
            flex: 1
        }
    ],
    selType: 'cellmodel'
});