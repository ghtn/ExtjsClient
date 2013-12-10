/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.MaterialTypeTreeStore', {
    extend: 'Ext.data.TreeStore',
    id: 'materialTypeTreeStore',
    root: {
        id: '-1',
        expanded: false,
        text: '素材类别'
    },

    model: 'NewsPaper.model.MaterialTypeTreeModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/newsPaper/materialType/listMaterialType'
    }
    //autoLoad: true
    //autoSync: true
});