/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.SubjectAnswerStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.SubjectAnswerModel'
//    proxy: {
//        type: 'ajax',
//        url: './data/subjectAnswer.json',
//        reader: 'json'
//    },
//    autoLoad: true
});