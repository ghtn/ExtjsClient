/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.SubjectTypeStore', {
    extend: 'Ext.data.Store',
    id: 'paperStatusStore',
    model: 'NewsPaper.model.SubjectTypeModel',

    proxy: {
        type: 'ajax',
        url: './data/subjectType.json',
        reader: 'json'
    },
    autoLoad: true
    //autoSync: true
});