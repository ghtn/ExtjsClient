/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.TagTreeStore', {
    extend: 'Ext.data.TreeStore',
    id: 'tagTreeStore',
    root: {
        id: '-1',
        expanded: false,
        text: '我的标签'
    },

    model: 'NewsPaper.model.TagTreeModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/newsPaper/tag/listTag'
    }
    //autoLoad: true
    //autoSync: true
});