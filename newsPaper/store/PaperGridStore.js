/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.PaperGridStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.PaperGridModel',
    pageSize: 20,
    proxy: {
        type: 'ajax',
//        url: '',
        url: '/InformationSystemService/paper/listPaperByPage',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
//    autoLoad: true
});