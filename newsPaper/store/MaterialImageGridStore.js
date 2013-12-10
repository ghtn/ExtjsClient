/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.MaterialImageGridStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.MaterialImageGridModel',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/newsPaper/material/getMaterialByPage',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
    //autoLoad: true
});