/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.SubjectEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'subjectEditWindowView',
    title: '编辑试题',
    modal: true,
    width: 600,
    height: 550,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'subjectEditForm',
        bodyPadding: 5,
        url: '/InformationSystemService/subject/update',

        defaultType: 'textfield',
        items: [
            {
                name: 'id',
                hidden: true
            },
            {
                xtype: 'combo',
                fieldLabel: '部门',
                name: 'deptId',
                itemId: 'subjectEditDept',
                store: 'DepartmentStore',
                editable: false,
                valueField: 'id',
                displayField: 'name',
                anchor: '100%',
                allowBlank: false,
                blankText: '必须选择部门!'
            },
            {
                xtype: 'radiogroup',
                fieldLabel: '试题类型',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                itemId: 'subjectEditTypeRadio',
                layout: 'hbox',
                items: [
                    {
                        boxLabel: '选择题',
                        itemId: 'editTypeRadio1',
                        name: 'type',
                        inputValue: 0,
                        checked: true
                    },
                    {
                        boxLabel: '判断题',
                        itemId: 'editTypeRadio2',
                        name: 'type',
                        inputValue: 1
                    }
                ]
            },
            {
                fieldLabel: '分值',
                name: 'mark',
                allowBlank: false,
                blankText: '分值不能为空!',
                regex: /^[1-9][0-9]*$/,
                regexText: '分值必须为正整数!'
            },
            {
                xtype: 'textareafield',
                fieldLabel: '题目描述',
                name: 'description',
                height: 150,
                allowBlank: true,
                blankText: '题目描述不能为空!',
                anchor: '100%'
            },
            {
                xtype: 'grid',
                itemId: 'subjectEditChoice',
                title: '答案',
                height: 230,
                name: 'choice',
                store: 'SubjectAnswerStore',
                columns: [
                    {
                        header: '描述',
                        dataIndex: 'answerDesc',
                        editor: {
                            xtype: 'textfield',
                            allowBlank: false
                        },
                        flex: 1
                    },
                    {
                        xtype: 'checkcolumn',
                        dataIndex: 'correct',
                        text: '正确答案'
                    }
                ],
                selType: 'cellmodel',
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],
                tbar: [
                    { itemId: 'addSubjectEditChoice', xtype: 'button', text: '增加', iconCls: 'Add' },
                    { itemId: 'removeSubjectEditChoice', xtype: 'button', text: '删除', iconCls: 'Delete' }
                ]
            },
            {
                xtype: 'radiogroup',
                fieldLabel: '判断结果',
                itemId: 'editJudgeRadioGroup',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        itemId: 'editJudgeTrue',
                        boxLabel: '正确',
                        name: 'correct',
                        inputValue: 1,
                        checked: true
                    },
                    {
                        itemId: 'editJudgeFalse',
                        boxLabel: '错误',
                        name: 'correct',
                        inputValue: 0
                    }
                ]
            }
        ],
        buttons: [
            {
                itemId: 'subjectEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            },
            {
                itemId: 'subjectEditFormReset',
                text: '重置'
            }
        ]
    }

});