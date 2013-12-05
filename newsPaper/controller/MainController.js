/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 上午9:11
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: ['Viewport', 'MainTreeView', 'MainTabpanelView'],
    stores: ['MainTreeStore'],
    models: ['MainTreeModel'],

    init: function () {
        //init函数通过this.control来负责监听
        this.control({
            //可以通过别名或itemId设置需要监听的组建
            //别名：'别名'，itemId: '#itemId'
            'mainTreeView': {
                //监听鼠标点击事件，点击后调用changePage方法
                itemclick: this.showPage
            }
        });
    },

    showPage: function (view, rec, item, index, e) {
        //console.log(rec.data.text);
        if (rec.data.leaf == true) {
            var mainTabPanel = Ext.getCmp('mainTabpanelView');
            var tab = Ext.getCmp(rec.data.id);
            if (!tab) {
                tab = mainTabPanel.add({
                    id: rec.data.id,
                    title: rec.data.text,
                    xtype: rec.data.url,
                    //html: rec.data.text,
                    closable: true
                });
            }
            mainTabPanel.setActiveTab(tab);

            var store;
            if (rec.data.id == 10) {
                store = Ext.data.StoreManager.lookup('ContactsGridStore');
                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });
            }

        }
    }
});