/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.ExamEmpStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.ExamEmpGridModel',
    proxy: {
        type: 'ajax',
        url: '/InformationSystemService/exam/getEmps',
        reader: {
            type: 'json'
        }
    }
//    autoLoad: true
});