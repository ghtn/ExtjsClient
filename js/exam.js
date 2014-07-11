/**
 * Created by lihe on 14-7-8.
 */
var loading = false;
var subjectList;

// 从sessionStorage中获取登录人员的身份证号和考试id
var idCardInfo = sessionStorage.getItem("idCardInfo");
var examId = sessionStorage.getItem("examId");

function loadPaper() {
    if (loading == false) {
        $.mobile.loading("show", {text: "正在获取试卷信息...", textVisible: true});
        loading = true;

        $.ajax({
            url: "/InformationSystemService/exam/loadPaper",
            data: "examId=" + examId,
            dataType: "json",
            type: "post",
            timeout: 10000,
            success: function (data) {
                if (data != undefined && data != null && data.code == 1) {
                    var paperDiv = $("#paperDiv");
                    paperDiv.html("");
                    subjectList = data.subjectList;
                    var divStr = "";
                    for (var i = 0; i < subjectList.length; i++) {
                        var subject = subjectList[i];
                        var subjectDesc = "";
                        var subjectAnswer = "";
                        var chooseAnswer = "";
                        chooseAnswer = "<fieldset data-role='controlgroup' data-type='horizontal'>";
                        chooseAnswer += "<legend>选择答案:</legend>";
                        if (subject.type == 0) {
                            // 单选题
                            subjectDesc = (i + 1) + "." + subject.description;
                            for (var j = 0; j < subject.answers.length; j++) {
                                subjectAnswer += subject.answers[j].mark + "." + subject.answers[j].description + "<br>";
                                chooseAnswer += "<label for='answer" + subject.answers[j].id + "'>" + subject.answers[j].mark + "</label>";
                                chooseAnswer += "<input type='radio' name='subjectRadio" + i + "' id='answer" + subject.answers[j].id + "' onchange='chooseAnswer(" + subject.id + ", " + subject.answers[j].id + ", " + subject.type + ", null)'>";
                            }

                        }
                        if (subject.type == 2) {
                            subjectDesc = (i + 1) + "." + subject.description + "(多选题)";
                            // 多选题
                            for (var j = 0; j < subject.answers.length; j++) {
                                subjectAnswer += subject.answers[j].mark + "." + subject.answers[j].description + "<br>";
                                chooseAnswer += "<label for='answer" + subject.answers[j].id + "'>" + subject.answers[j].mark + "</label>";
                                chooseAnswer += "<input type='checkbox' name='subjectCheckbox" + i + "' value='" + subject.answers[j].id + "' id='answer" + subject.answers[j].id + "' onchange='chooseAnswer(" + subject.id + ", " + subject.answers[j].id + ", " + subject.type + ", \"subjectCheckbox" + i + "\")'>";
                            }
                        }
                        if (subject.type == 1) {
                            // 判断题
                            subjectDesc = (i + 1) + "." + subject.description;
                            chooseAnswer += "<label for='radioTrue" + subject.id + "'>正确</label>";
                            chooseAnswer += "<input type='radio' name='subjectRadio" + i + "' id='radioTrue" + subject.id + "' onchange='chooseAnswer(" + subject.id + ", true, " + subject.type + ", null)'>";
                            chooseAnswer += "<label for='radioFalse" + subject.id + "'>错误</label>";
                            chooseAnswer += "<input type='radio' name='subjectRadio" + i + "' id='radioFalse" + subject.id + "' onchange='chooseAnswer(" + subject.id + ", false, " + subject.type + ", null)'>";

                        }

                        chooseAnswer += "</fieldset>";

                        divStr += "<div>" + subjectDesc + "<br>" + subjectAnswer + chooseAnswer + "<br>" + "</div><br>";


                    }
                    paperDiv.html(divStr).trigger("create");

                    for (var i = 0; i < subjectList.length; i++) {
                        loadAnswer(subjectList[i]);
                    }

                } else {
                    $().toastmessage('showToast', {
                        text: '获取试卷信息失败！',
                        sticky: false,
                        position: 'middle-center',
                        type: 'error'
                    });
                }
                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $().toastmessage('showToast', {
                    text: '访问服务器错误！',
                    sticky: false,
                    position: 'middle-center',
                    type: 'error'
                });
                $.mobile.loading("hide");
                loading = false;
            }
        });
    }

}

function chooseAnswer(subjectId, answerId, subjectType, checkboxName) {
    if (subjectType == 0) {
        // 单选题
        // 存储答题信息, "考试id#身份证号#题目id" 作为key, 答案id作为value
        localStorage.setItem(examId + "#" + idCardInfo + "#" + subjectId, answerId);
    }

    if (subjectType == 1) {
        // 判断题
        localStorage.setItem(examId + "#" + idCardInfo + "#" + subjectId, answerId);
    }

    if (subjectType == 2) {
        // 多选题
        var answerStr = "";
        $("input:checkbox[name=" + checkboxName + "]:checked").each(function () {
            answerStr += $(this).val() + "#";
        });
        answerStr = answerStr.substr(0, answerStr.length - 1); // 去掉字符串中的最后一个"#"
        localStorage.setItem(examId + "#" + idCardInfo + "#" + subjectId, answerStr);
    }

}

function loadAnswer(subject) {
    var keyStr = examId + "#" + idCardInfo + "#" + subject.id;
    var answerStr = localStorage.getItem(keyStr);

    // 如果有答案信息, 把答案加载到页面上
    if (answerStr != "" && answerStr != null) {
        if (subject.type == 0) {
            // 单选题
            $("#answer" + answerStr).attr("checked", true).checkboxradio("refresh");
        }
        if (subject.type == 1) {
            // 判断题
            if (answerStr == "true") {
                $("#radioTrue" + subject.id).attr("checked", true).checkboxradio("refresh");
            }

            if (answerStr == "false") {
                $("#radioFalse" + subject.id).attr("checked", true).checkboxradio("refresh");
            }
        }
        if (subject.type == 2) {
            // 多选题
            var items = answerStr.split("#");
            for (var i = 0; i < items.length; i++) {
//            alert(items[i]);
                $("#answer" + items[i]).attr("checked", true).checkboxradio("refresh");
            }
        }
    }

}

function finishExam() {
    if (loading == false) {
        var paramStr = "";
        for (var i = 0; i < subjectList.length; i++) {
            var keyStr = examId + "#" + idCardInfo + "#" + subjectList[i].id;
            var answerStr = localStorage.getItem(keyStr);
            paramStr += keyStr + "#" + answerStr + "@";
        }

        paramStr = paramStr.substr(0, paramStr.length - 1); //去掉最后一个"@"

        $.mobile.loading("show", {text: "正在提交答题信息...", textVisible: true});
        loading = true;

        $.ajax({
            url: "/InformationSystemService/exam/finishExam",
            data: "paramStr=" + paramStr,
            dataType: "json",
            type: "post",
            timeout: 10000,
            success: function (data) {
                if (data != undefined && data != null && data.code == 1) {
                    $().toastmessage('showToast', {
                        text: '提交答题信息成功！考试成绩为 : ' + data.examScore + "分, 一共错了" + data.errorCount + "题!",
                        sticky: true,
                        position: 'middle-center',
                        type: 'success'
                    });
                    localStorage.clear();
                } else {
                    $().toastmessage('showToast', {
                        text: '提交答题信息失败！' + data.msg,
                        sticky: true,
                        position: 'middle-center',
                        type: 'error'
                    });
                }
                $.mobile.loading("hide");
                loading = false;
            },
            error: function () {
                $().toastmessage('showToast', {
                    text: '访问服务器错误！',
                    sticky: true,
                    position: 'middle-center',
                    type: 'error'
                });
                $.mobile.loading("hide");
                loading = false;
            }
        });
    }
}