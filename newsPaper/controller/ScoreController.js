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
            }
        })
    },

    filterScore: function () {
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

//        alert("idCard = " + idCard + ", name = " + name + ", empNumber = " + empNumber + ", examId = " + examId + ", pass = " + pass);

        var store = Ext.data.StoreManager.lookup('ScoreGridStore');
        store.load({
            params: {
                idCard: idCard,
                name: name,
                empNumber: empNumber,
                examId: examId,
                examScore: -1,
                pass: pass,
                errorCount: -1
            }
        });
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

        /* var progress = Ext.MessageBox.wait('正在导出考试成绩数据', '导出', {
         text: '导出中...'
         });
         Ext.Ajax.request({
         url: '/InformationSystemService/score/exportScore',
         method: 'post',
         params: {
         idCard: idCard,
         name: name,
         empNumber: empNumber,
         examId: examId,
         examScore: -1,
         pass: pass,
         errorCount: -1
         },
         success: function (response) {
         progress.close();
         var result = Ext.JSON.decode(response.responseText);
         if (result.success) {
         Ext.example.msg('删除成功', result.msg);
         } else {
         Ext.MessageBox.alert('删除失败', result.msg);
         }
         },
         failure: function (response) {
         progress.close();
         var result = Ext.JSON.decode(response.responseText);
         Ext.MessageBox.alert('删除失败', result.msg);
         }
         });*/
    }
});




