/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.InfoModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'duty', type: 'string'},				// 职务
        {name: 'jobDist', type: 'string'},			// 工别
        {name: 'jobTitle', type: 'string'},			// 职称
        {name: 'jobType', type: 'string'},			// 工种
        {name: 'productionLine', type: 'string'},	// 生产线
        {name: 'source', type: 'string'}			// 来源
    ]
});