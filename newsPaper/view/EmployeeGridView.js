/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-4
 * Time: 下午4:40
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.view.EmployeeGridView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.employeeGridView',
    id: 'employeeGridView',
    store: 'EmployeeGridStore',
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SIMPLE'
    },
    columns: [
   		{xtype: 'rownumberer'},
        {
            text: 'ID',
            dataIndex: 'id',
            flex: 1
        },
        {
            text: '员工号',
            dataIndex: 'empNumber',
            flex: 2
        },
        {
            text: '姓名',
            dataIndex: 'name',
            flex: 2
        },
        {
            text: '曾姓名',
            dataIndex: 'secondName',
            hidden:true,
            flex: 2
        },

        {
            text: '性别',
            dataIndex: 'sex',
            flex: 1
        },
        {
            text: '国家地区',
            dataIndex: 'country',
            hidden:true,
            flex: 2
        },
        {
            text: '配置方式',
            dataIndex: 'cfgStyle',
            hidden:true,
            flex: 2
        },
        {
            text: '行政待遇级别',
            dataIndex: 'salaryGrade',
            hidden:true,
            flex: 1
        },
        {
            text: '技术人员',
            dataIndex: 'technicist',
            hidden:true,
            flex: 1
        },
        {
            text: '出身日期',
            dataIndex: 'birthday',
            hidden:true,
            flex: 2
        },
        {
            text: '身份证号',
            dataIndex: 'card',
            hidden:true,
            flex: 3
        },
        {
            text: '血型',
            dataIndex: 'bloodType',
            hidden:true,
            flex: 1
        },
        {
            text: '来源',
            dataIndex: 'source',
            hidden:true,
            flex: 2
        },
        {
            text: '参加工作时间',
            dataIndex: 'workTime',
            hidden:true,
            flex: 2
        },
        {
            text: '来本单位时间',
            dataIndex: 'unitTime',
            flex: 2
        },
        {
            text: '所在部门',
            dataIndex: 'deptName',
            flex: 2
        },
        {
            text: '部门号',
            dataIndex: 'deptId',
            flex: 1
        },
        {
            text: '本人籍贯',
            dataIndex: 'selfNationality',
            flex: 2
        },
        {
            text: '职务',
            dataIndex: 'duty',
            hidden:true,
            flex: 2
        },
        {
            text: '职务任职时间',
            dataIndex: 'dutyTime',
            hidden:true,
            flex: 2
        },
        {
            text: '职称',
            dataIndex: 'jobTitle',
            hidden:true,
            flex: 2
        },
        {
            text: '职称任职时间',
            dataIndex: 'jobTitleTime',
            hidden:true,
            flex: 2
        },
        {
            text: '工别',
            dataIndex: 'jobDist',
            hidden:true,
            flex: 2
        },
        {
            text: '工种',
            dataIndex: 'jobType',
            flex: 2
        },
        {
            text: '工种任职时间',
            dataIndex: 'jobTypeTime',
            hidden:true,
            flex: 2
        },
        {
            text: '文化程度',
            dataIndex: 'education',
            hidden:true,
            flex: 2
        },
        {
            text: '政治面貌',
            dataIndex: 'politicsStatus',
            hidden:true,
            flex: 2
        },
        {
            text: '在岗状态',
            dataIndex: 'postState',
            hidden:true,
            flex: 2
        },
        {
            text: '本人成分',
            dataIndex: 'myIngredient',
            hidden:true,
            flex: 2
        },
        {
            text: '健康状况',
            dataIndex: 'healthStatus',
            hidden:true,
            flex: 2
        },
        {
            text: '家庭出身',
            dataIndex: 'familyOrigin',
            hidden:true,
            flex: 2
        },
        {
            text: '岗位工资',
            dataIndex: 'postSalary',
            flex: 1
        },
        {
            text: '技能工资',
            dataIndex: 'skillSalary',
            hidden:true,
            flex: 1
        },
        {
            text: '第一学历',
            dataIndex: 'firstEducation',
            hidden:true,
            flex: 2
        },
        {
            text: '学校名称',
            dataIndex: 'birthday',
            hidden:true,
            flex: 2
        },
        {
            text: '就读形式',
            dataIndex: 'studyStyle',
            hidden:true,
            flex: 2
        },
        {
            text: '所学专业',
            dataIndex: 'profession',
            hidden:true,
            flex: 2
        },
        {
            text: '毕业时间',
            dataIndex: 'graduateTime',
            hidden:true,
            flex: 2
        },
        {
            text: '出身日期',
            dataIndex: 'birthday',
            hidden:true,
            flex: 2
        },
        {
            text: '本人特长',
            dataIndex: 'speciality',
            hidden:true,
            flex: 2
        },
        {
            text: '户籍所在地',
            dataIndex: 'domicilePlace',
            hidden:true,
            flex: 2
        },
        {
            text: '家庭住址',
            dataIndex: 'homeAddress',
            hidden:true,
            flex: 2
        },
        {
            text: '邮政编码',
            dataIndex: 'postalCode',
            hidden:true,
            flex: 2
        },
        {
            text: '联系电话',
            dataIndex: 'telphone',
            flex: 2
        },
        {
            text: '个人简历',
            dataIndex: 'resume',
            hidden:true,
            flex: 2
        },
        {
            text: '参军时间',
            dataIndex: 'armTime',
            hidden:true,
            flex: 2
        },
        {
            text: '退伍时间',
            dataIndex: 'endArmTime',
            hidden:true,
            flex: 2
        },
        {
            text: '转制时间',
            dataIndex: 'conversionTime',
            hidden:true,
            flex: 2
        },
        {
            text: '生产线',
            dataIndex: 'productLine',
            hidden:true,
            flex: 2
        },
        {
            text: '岗位',
            dataIndex: 'job',
            hidden:true,
            flex: 2
        },
        {
            text: '技术级别',
            dataIndex: 'skillGrage',
            hidden:true,
            flex: 1
        },
        {
            text: '职称资质',
            dataIndex: 'jobQualification',
            hidden:true,
            flex: 2
        },
        {
            text: '身份证出生日期',
            dataIndex: 'cardBirthday',
            hidden:true,
            flex: 2
        },
        {
            text: '备注',
            dataIndex: 'comment',
            hidden:true,
            flex: 2
        }
    ],
    bbar: [
        {
            xtype: 'pagingtoolbar',
            store: 'EmployeeGridStore',
            displayInfo: true
        }
    ],
    tbar: [
        {
            xtype: 'datefield',
            itemId: 'startDate',
            fieldLabel: '&nbsp来本单位日期',
            labelWidth: 80,
            format: 'Y-m-d',
            editable: true
        },
        '至',
        {
            xtype: 'datefield',
            itemId: 'endDate',
            format: 'Y-m-d',
            editable: true
        },
        '-',
        {
            itemId: 'filterEmployee', xtype: 'button', text: '过滤', iconCls: 'Arrowrefresh'
        },
        '-',
        { itemId: 'addEmployee', xtype: 'button', text: '增加', iconCls: 'Add' },
        '-',
        { itemId: 'removeEmployee', xtype: 'button', text: '删除', iconCls: 'Delete' },
        '-',
        { itemId: 'importEmployee', xtype: 'button', text: '导入', iconCls: 'Pageexcel' }
    ]

});