/**
 * Created with IntelliJ IDEA.
 * User: Administrator
 * Date: 13-12-2
 * Time: 下午4:18
 * To change this template use File | Settings | File Templates.
 */
Ext.define('NewsPaper.model.EmployeeModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},					// ID
        {name: 'empNumber', type: 'string'},		// 员工号
        {name: 'name', type: 'string'},				// 姓名
        {name: 'secondName', type: 'string'},		// 曾姓名
        {name: 'sex', type: 'string'},				// 性别
        {name: 'country', type: 'string'},			// 国家地区
        {name: 'cfgStyle', type: 'string'},			// 配置方式
        {name: 'salaryGrade', type: 'string'},		// 行政待遇级别
        {name: 'technicist', type: 'string'},		// 技术人员
        {name: 'birthday', type: 'string'},			// 出身日期
        {name: 'card', type: 'string'},				// 身份证号
        {name: 'bloodType', type: 'string'},		// 血型
        {name: 'source', type: 'string'},			// 来源
        {name: 'workTime', type: 'string'},			// 参加工作时间
        {name: 'unitTime', type: 'string'},			// 来本单位时间
        {name: 'deptName', type: 'string'},			// 所在部门
        {name: 'duty', type: 'string'},				// 职务
        {name: 'dutyTime', type: 'string'},			// 职务任职时间
        {name: 'jobTitle', type: 'string'},			// 职称
        {name: 'jobTitleTime', type: 'string'},		// 职称任职时间
        {name: 'jobDist', type: 'string'},			// 工别
        {name: 'jobType', type: 'string'},			// 工种
        {name: 'jobTypeTime', type: 'string'},		// 工种任职时间
        {name: 'education', type: 'string'},		// 文化程度
        {name: 'politicsStatus', type: 'string'},	// 政治面貌
        {name: 'postState', type: 'string'},		// 在岗状态
        {name: 'myIngredient', type: 'string'},		// 本人成分
        {name: 'healthStatus', type: 'string'},		// 健康状况
        {name: 'familyOrigin', type: 'string'},		// 家庭出身
        {name: 'postSalary', type: 'float'},		// 岗位工资
        {name: 'skillSalary', type: 'float'},		// 技能工资
        {name: 'firstEducation', type: 'string'},	// 第一学历
        {name: 'schoolName', type: 'string'},		// 学校名称
        {name: 'studyStyle', type: 'string'},		// 就读形式
        {name: 'profession', type: 'string'},		// 所学专业
        {name: 'graduateTime', type: 'string'},		// 毕业时间
        {name: 'speciality', type: 'string'},		// 本人特长
        {name: 'domicilePlace', type: 'string'},	// 户籍所在地
        {name: 'homeAddress', type: 'string'},		// 家庭住址
        {name: 'postalCode', type: 'string'},		// 邮政编码
        {name: 'telphone', type: 'string'},			// 联系电话
        {name: 'resume', type: 'string'},			// 个人简历
        {name: 'armTime', type: 'string'},			// 参军时间
        {name: 'endArmTime', type: 'string'},		// 退伍时间
        {name: 'conversionTime', type: 'string'},	// 转制时间
        {name: 'productLine', type: 'string'},		// 生产线
        {name: 'job', type: 'string'},				// 岗位
        {name: 'skillGrage', type: 'int'},			// 技术级别
        {name: 'jobQualification', type: 'string'},	// 职称资质
        {name: 'cardBirthday', type: 'string'},		// 身份证出生日期
        {name: 'comment', type: 'string'},			// 备注
        {name: 'selfNationality', type: 'string'},	// 本人籍贯
        {name: 'deptId', type: 'string'},			// 部门号
        {name: 'productionLine', type: 'string'},	// 生产线
        {name: 'warn', type: 'string'}				// 预警
    ]

});