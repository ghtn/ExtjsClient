/**
 * Created by Administrator on 13-12-5.
 */
Ext.define('NewsPaper.view.PaperEditWindowView', {
    extend: 'Ext.window.Window',
    id: 'paperEditWindowView',
    title: '编辑试卷',
    modal: true,
    width: 700,
    height: 550,
    autoScroll: true,
    closable: true,
    layout: 'fit',
    items: {
        xtype: 'form',
        itemId: 'paperEditForm',
        bodyPadding: 5,
        url: '/InformationSystemService/paper/update',

        defaultType: 'textfield',
        items: [
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '试卷名称',
                        labelWidth: 60,
                        name: 'name',
                        width: 410,
                        allowBlank: false,
                        blankText: '试卷名称不能为空!',
                        anchor: '100%'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'textfield',
                        itemId: 'subNumText',
                        fieldLabel: '题目数量',
                        labelWidth: 60,
                        name: 'subNum',
                        readOnly: true
                    }
                ]
            },
            {
                xtype: 'fieldcontainer',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: '考试时长(分钟)',
                        labelWidth: 90,
                        name: 'examTime',
                        allowBlank: false,
                        blankText: '考试时长不能为空!',
                        regex: /^[1-9][0-9]*$/,
                        regexText: '考试时长必须为正整数!'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '满分',
                        labelWidth: 40,
                        name: 'fullScore',
                        allowBlank: false,
                        blankText: '分值不能为空!',
                        regex: /^[1-9][0-9]*$/,
                        regexText: '分值必须为正整数!'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'splitter'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: '及格分',
                        labelWidth: 50,
                        name: 'passScore',
                        allowBlank: false,
                        blankText: '分值不能为空!',
                        regex: /^[1-9][0-9]*$/,
                        regexText: '分值必须为正整数!'
                    }
                ]
            },
            {
                xtype: 'grid',
                itemId: 'paperSubjectGrid',
                title: '题目列表',
                height: 400,
                name: 'paperSubject',
                store: 'PaperSubjectGridStore',
                columns: [
                    {xtype: 'rownumberer'},
                    {
                        text: 'id', dataIndex: 'id', flex: 1
                    },
                    {
                        text: '部门',
                        dataIndex: 'deptName',
                        flex: 2
                    },
                    {
                        text: '题目描述',
                        dataIndex: 'description',
                        flex: 5
                    },
                    {
                        text: '分值',
                        dataIndex: 'mark',
                        flex: 1
                    },
                    {
                        text: '类型',
                        dataIndex: 'typeDesc',
                        flex: 2
                    },
                    {
                        text: '创建者',
                        dataIndex: 'creator',
                        flex: 2
                    },
                    {
                        text: '创建时间',
                        dataIndex: 'createTime',
                        flex: 3
                    }
                ],
                selType: 'cellmodel',
                plugins: [
                    Ext.create('Ext.grid.plugin.CellEditing', {
                        clicksToEdit: 1
                    })
                ],
                tbar: [
                    { itemId: 'addPaperSubjectFromBank', xtype: 'button', text: '从题库中选择', iconCls: 'Applicationviewlist' }
                ]
            }
        ],
        buttons: [
            {
                itemId: 'paperEditFormSubmit',
                text: '提交',
                formBind: true,
                disabled: true
            }
        ]
    }

});