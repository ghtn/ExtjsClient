/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.MakePaperSubjectGridStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.SubjectGridModel',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '/InformationSystemService/subject/listSubjectByDate',
        reader: {
            type: 'json'
        }
    }
//    autoLoad: true
});