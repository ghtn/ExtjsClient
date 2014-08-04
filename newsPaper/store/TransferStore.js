/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.TransferStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.TransferModel',
    proxy: {
        type: 'ajax',
//		url: './data/transfer.json',
		url: '/InformationSystemService/transfer/listTransferByCard',
        reader: {
            type: 'json',
            root: 'items'
        }
    }
//    autoLoad: true
});