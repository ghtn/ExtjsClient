/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午3:38
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.MainTreeView', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.mainTreeView',
    rootVisible: false,
    border: false,
    store: 'MainTreeStore'
});