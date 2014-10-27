/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.PaperPublishStore', {
    extend: 'Ext.data.Store',
    id: 'paperStore',

    model: 'NewsPaper.model.PaperGridModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: '/InformationSystemService/paper/getPublish'
//        url: ''
    },
//    autoLoad: true
    //autoSync: true
});