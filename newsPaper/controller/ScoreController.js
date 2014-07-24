/**
 * 试题库controller
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:28
 * To change this template use File | Settings | File Templates.
 */

Ext.define('NewsPaper.controller.ScoreController', {
    extend: 'Ext.app.Controller',
    views: ['ScoreBaseContainer', 'ScoreGridContainer', 'ScoreGridView'],
    stores: [ 'ScoreGridStore', 'ExamComboStore', 'PassComboStore'],
    models: [ 'PaperGridModel', 'ExamComboModel', 'PassComboModel'],

    init: function () {
        this.control({
            '#filterScore': {
                click: this.filterScore
            },
            '#exportScore': {
                click: this.exportScore
            },
            '#scoreGridView': {
                render: this.scoreGridRender
            }
        })
    },

    filterScore: function () {
        var store = Ext.data.StoreManager.lookup('ScoreGridStore');
        store.loadPage(1);
    },

    exportScore: function () {
        var grid = Ext.getCmp('scoreGridView');
        var idCard = grid.down('#idCard').getValue();
        var name = grid.down('#name').getValue();
        var empNumber = grid.down('#empNumber').getValue();
        var examId = grid.down('#examCombo').getValue();
        if (examId == null) {
            examId = -1;
        }
        var pass = grid.down('#passCombo').getValue();
        if (pass == null) {
            pass = -1;
        }

        window.open('/InformationSystemService/score/exportScore?idCard=' + idCard + "&name=" + name
            + "&empNumber=" + empNumber + "&examId=" + examId + "&examScore=-1&pass=" + pass + "&errorCount=-1");
    },

    scoreGridRender: function (grid) {
        var store = grid.getStore();

        store.on('beforeload', function () {
            var idCard = "";
            if (grid.down('#idCard')) {
                idCard = grid.down('#idCard').getValue();
            }

            var name = "";
            if (grid.down('#name')) {
                name = grid.down('#name').getValue();
            }

            var empNumber = "";
            if (grid.down('#empNumber')) {
                empNumber = grid.down('#empNumber').getValue();
            }

            var examId = null;
            if (grid.down('#examCombo')) {
                examId = grid.down('#examCombo').getValue();
            }
            if (examId == null) {
                examId = -1;
            }

            var pass = null;
            if (grid.down('#passCombo')) {
                pass = grid.down('#passCombo').getValue();
            }
            if (pass == null) {
                pass = -1;
            }

            var typeParam = {
                idCard: idCard,
                name: name,
                empNumber: empNumber,
                examId: examId,
                examScore: -1,
                pass: pass,
                errorCount: -1
            };
            Ext.apply(store.proxy.extraParams, typeParam);
        })
    }
});




