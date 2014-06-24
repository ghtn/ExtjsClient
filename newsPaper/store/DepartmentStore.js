/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.DepartmentStore', {
    extend: 'Ext.data.Store',
    id: 'departmentStore',

    model: 'NewsPaper.model.DepartmentModel',
    proxy: {
        type: 'ajax',
        reader: 'json',
        url: 'http://localhost:8080/InformationSystemService/department'
    }
    //autoLoad: true
    //autoSync: true
});