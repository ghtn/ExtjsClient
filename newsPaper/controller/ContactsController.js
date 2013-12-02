/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.controller.ContactsController', {
    extend:'Ext.app.Controller',
    views: ['ContactsBaseContainer','ContactsTypeContainer','ContactsTypeTreeView'],
    stores: ['ContactsTypeTreeStore'],
    models: ['ContactsTypeTreeModel']
});