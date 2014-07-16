/**
 * 主界面controller
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

    /**
     * 点击左边的功能树, 在右边的功能区以标签页的形式展现
     * @param view
     * @param rec
     */
    showPage: function (view, rec) {
        if (rec.data.leaf == true) {
            var mainTabPanel = Ext.getCmp('mainTabpanelView');
            var tab = Ext.getCmp(rec.data.id);
            if (!tab) {
                tab = mainTabPanel.add({
                    id: rec.data.id,
                    title: rec.data.text,
                    xtype: rec.data.url,
                    closable: true
                });
            }
            mainTabPanel.setActiveTab(tab);

            var store;
            // 加载素材数据
            if (rec.data.id == 5) {
                store = Ext.data.StoreManager.lookup('MaterialTextGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                store = Ext.data.StoreManager.lookup('MaterialImageGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载素材类别, 用于在增加和编辑文本素材时取得素材类别的下拉框数据
                store = Ext.data.StoreManager.lookup('MaterialTypeStore');
                store.load();
            }

            // 加载通讯录数据
            if (rec.data.id == 10) {
                store = Ext.data.StoreManager.lookup('ContactsGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });
            }

            // 加载标签下的素材数据
            if (rec.data.id == 11) {
                // 加载文本素材
                store = Ext.data.StoreManager.lookup('TagMaterialTextGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载图片素材
                store = Ext.data.StoreManager.lookup('TagMaterialImageGridStore');

                store.load({
                    params: {
                        start: 0,
                        limit: 20
                    }
                });

                // 加载素材类别, 用于在增加和编辑文本素材时取得素材类别的下拉框数据
                store = Ext.data.StoreManager.lookup('MaterialTypeStore');
                store.load();
            }

            // 加载题库数据
            if (rec.data.id == 401) {
                store = Ext.data.StoreManager.lookup('SubjectGridStore');
                // 参数在grid渲染之后通过store的beforeload事件添加
                store.loadPage(1);
            }

            // 制作试卷, 加载题库数据
            if (rec.data.id == 402) {
                store = Ext.data.StoreManager.lookup('MakePaperSubjectGridStore');
                store.load();
            }

            // 试卷管理, 加载试卷数据
            if (rec.data.id == 403) {
                store = Ext.data.StoreManager.lookup('PaperGridStore');
                store.load();
            }

            // 考试管理, 加载考试数据
            if (rec.data.id == 404) {
                store = Ext.data.StoreManager.lookup('ExamGridStore');
                store.load();
            }

            // 成绩管理, 加载考试成绩数据
            if (rec.data.id == 405) {
                store = Ext.data.StoreManager.lookup('ScoreGridStore');
                store.load();
            }
        }
    }
});