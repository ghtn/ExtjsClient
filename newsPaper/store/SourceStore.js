/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:43
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.SourceStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.BaseModel',
    proxy: {
        type: 'ajax',
        url: '/InformationSystemService/info/listField',
        reader: {
            type: 'json',
            root: 'items'
        }
    },
    autoLoad: true
});