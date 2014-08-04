/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.store.RestoralGridStore', {
    extend: 'Ext.data.Store',
    model: 'NewsPaper.model.EmployeeGridModel',
    pageSize: 20,
    proxy: {
        type: 'ajax',
//        url: './data/employee.json',
		url: '/InformationSystemService/employee/listEmployeeByPage',
        reader: {
            type: 'json',
            root: 'items',
            totalProperty: 'total'
        }
    }
//    autoLoad: true
});