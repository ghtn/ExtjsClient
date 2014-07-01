/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.PaperController', {
    extend: 'Ext.app.Controller',
    views: ['PaperBaseContainer', 'PaperGridContainer', 'PaperGridView'],
    stores: [ 'PaperGridStore', 'DepartmentStore'],
    models: [ 'PaperGridModel', 'DepartmentModel'],

    init: function () {
        this.control({

        })
    }


});




