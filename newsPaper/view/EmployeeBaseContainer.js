/**
 * Created by lihe on 14-6-23.
 */
Ext.define('NewsPaper.view.EmployeeBaseContainer', {
    extend: 'Ext.container.Container',
    alias: 'widget.employeeBaseContainer',
    layout: 'border',
    items: [
        {
            region: 'center',
            autoScroll: true,
            items: [
                {
                    xtype: 'employeeGridContainer'
                }
            ]
        }
    ]
});