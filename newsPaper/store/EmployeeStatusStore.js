/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:17
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.EmployeeStatusStore', {
    extend: 'Ext.data.Store',
    id: 'employeeStatusStore',
    model: 'NewsPaper.model.EmployeeStatusModel',

    proxy: {
        type: 'ajax',
        url: './data/employeeStatus.json',
        reader: 'json'
    },
    autoLoad: true
    //autoSync: true
});