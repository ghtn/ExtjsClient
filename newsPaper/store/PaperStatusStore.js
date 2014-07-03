/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.PaperStatusStore', {
    extend: 'Ext.data.Store',
    id: 'paperStatusStore',
    model: 'NewsPaper.model.PaperStatusModel',

    proxy: {
        type: 'ajax',
        url: './data/paperStatus.json',
        reader: 'json'
    },
    autoLoad: true
    //autoSync: true
});