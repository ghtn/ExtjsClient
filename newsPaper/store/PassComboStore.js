/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.PassComboStore', {
    extend: 'Ext.data.Store',
    id: 'passComboStore',
    model: 'NewsPaper.model.PassComboModel',

    proxy: {
        type: 'ajax',
        url: './data/passCombo.json',
        reader: 'json'
    },
    autoLoad: true
    //autoSync: true
});