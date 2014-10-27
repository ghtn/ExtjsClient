/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.MainTreeStore', {
    extend: 'Ext.data.TreeStore',
    defaultRoodId: 'root',
    model: 'NewsPaper.model.MainTreeModel',

    proxy: {
        type: 'ajax',
        url: '/InformationSystemService/tree/list',
        reader: 'json'
    },
    autoLoad: true
});