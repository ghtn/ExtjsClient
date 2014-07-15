/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.ExamComboStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.ExamComboModel',
    proxy: {
        type: 'ajax',
        url: '/InformationSystemService/exam/getExamCombo',
        reader: {
            type: 'json'
        }
    }
//    autoLoad: true
});