/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:38
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.TransferGridContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.transferGridContainer',
    items: [
        {
            xtype: 'transferGridView'
        }
    ]
});