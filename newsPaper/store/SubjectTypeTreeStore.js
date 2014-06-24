/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.SubjectTypeTreeStore', {
    extend: 'Ext.data.TreeStore',
    id: 'subjectTypeTreeStore',
    defaultRoodId: 'root',
    root: {
        id: '-1',
        expanded: true,
        text: '试题类别'
    },

    model: 'NewsPaper.model.SubjectTypeTreeModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: './data/subjectTypeTree.json'
    }
    // autoLoad: true
    //autoSync: true
});