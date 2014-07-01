/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-11-29
 * Time: 下午2:42
 * To change this template use File | Settings | File Templates.
 */
Ext.onReady(function () {
    //开启悬浮提示功能
    Ext.QuickTips.init();

    //开启动态加载
    Ext.Loader.setConfig({
        enabled: true
    });

    Ext.application({
        //设定命名空间
        name: 'NewsPaper',
        //指定配置选项，设置相应的路径
        appFolder: 'newsPaper',
        //加载控制器
        controllers: ['MainController', 'ContactsController', 'MaterialController', 'TagController', 'SubjectController', 'MakePaperController', 'PaperController'],
        //自动加载和实例化Viewport文件
        autoCreateViewport: true
    });
});
