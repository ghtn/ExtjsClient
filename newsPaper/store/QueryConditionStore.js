/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */
Ext.define('App.store.QueryConditionStore', {
    extend: 'Ext.data.Store',
    model: 'App.model.QueryConditionModel',
    proxy: {
        type: 'ajax',
        url: './data/queryCondition.json',
        reader: 'json'
    },
    autoLoad: true
});