/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.MaterialTypeStore', {
    extend: 'Ext.data.Store',
    id: 'materialTypeStore',

    model: 'NewsPaper.model.MaterialTypeTreeModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/newsPaper/materialType/listMaterialType'
    }
    //autoLoad: true
    //autoSync: true
});